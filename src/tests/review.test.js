import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import app from '../app';
import models from '../database/models';
import jwt from 'jsonwebtoken';
import generateToken from '../helpers/generateToken';
chai.use(chaiHttp);
dotenv.config();
describe('POST /reviews/:productId/review', () => {
    let customer, merchant, roles, product;

    beforeEach(async () => {
        await models.sequelize.sync({ force: true });
        await models.Role.destroy({ where: {} });
        await models.UserRole.destroy({ where: {} });
        roles = await models.Role.bulkCreate([
            {
                id: uuidv4(),
                name: 'Admin',
                description:
                    'As an admin I should be able to monitor sytem grant and revoke other users permissions',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Merchant',
                description:
                    'As a merchant I should be to create, publish, and sell my product',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Customer',
                description:
                    'As a customer I should be able to vist all listed product and buy a products',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        roles = JSON.parse(JSON.stringify(roles));

        const merchantRole = roles.find((role) => role.name === 'Merchant');
        const customerRole = roles.find((role) => role.name === 'Customer');

        // Users
        merchant = await models.User.create({
            id: uuidv4(),
            firstName: 'Eric',
            lastName: 'Ndungutse',
            userName: 'eric_dnungutse',
            telephone: '0785283007',
            address: 'Muhanga',
            email: 'dav.ndungutse@example.com',
            password: await bcrypt.hash('Password@123', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Users
        customer = await models.User.create({
            id: uuidv4(),
            firstName: 'Eric',
            lastName: 'Ndungutse',
            userName: 'eric_dnungutse',
            telephone: '0785283007',
            address: 'Muhanga',
            email: 'dav.ndungutse@example2.com',
            password: await bcrypt.hash('Password@123', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // UserRoles
        await models.UserRole.create({
            // Merchant
            id: uuidv4(),

            userId: merchant.id,
            roleId: merchantRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // UserRoles
        await models.UserRole.create({
            // Merchant
            id: uuidv4(),

            userId: customer.id,
            roleId: customerRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        product = await models.Product.create({
            id: uuidv4(),
            name: 'Product 1',
            userId: merchant.id,
            description: 'Product 1 description',
            price: 100,
            imageUrl: 'https://via.placeholder.com/150',
            categoryId: uuidv4(),
        });
    });

    afterEach(async () => {
        await models.Review.destroy({ where: {} });
        await models.User.destroy({ where: {} });
        await models.Product.destroy({ where: {} });
    });
    it('should return 201 if the review is created successfully', async () => {
        const token = generateToken(
            { userId: customer.id },
            { expiresIn: '1d' }
        );
        const requestBody = {
            rate: 4,
            feedback: 'Great Product',
        };
        const response = await chai
            .request(app)
            .post(`/reviews/${product.id}/review`)
            .send(requestBody)
            .set('authorization', `Bearer ${token}`);

        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Review Created Successfully');
        expect(response.body.Review.rate).to.equal(requestBody.rate);
        expect(response.body.Review.feedback).to.equal(requestBody.feedback);
        expect(response.body.Review.userId).to.equal(customer.id);
        expect(response.body.Review.productId).to.equal(product.id);
    });

    it('Should return 400 if user has already rated that product', async () => {
        const token = generateToken(
            { userId: customer.id },
            { expiresIn: '1d' }
        );
        await models.Review.create({
            userId: customer.id,
            productId: product.id,
            rate: 4,
            feedback: 'Good Product',
        });
        const requestBody = {
            rate: 4,
            feedback: 'Great Product!',
        };
        const response = await chai
            .request(app)
            .post(`/reviews/${product.id}/review`)
            .send(requestBody)
            .set('authorization', `Bearer ${token}`);
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal(
            'You have already rated this product'
        );
    });

    it('should return 404 if product is not found', async () => {
        const token = generateToken(
            { userId: customer.id },
            { expiresIn: '1d' }
        );
        const requestBody = {
            rate: 4,
            feedback: 'Great Product !',
        };
        const response = await chai
            .request(app)
            .post(`/reviews/${uuidv4()}/review`)
            .send(requestBody)
            .set('authorization', `Bearer ${token}`);
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Product not found');
    });
});
