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
    let user, user2, product, roles, token;

    beforeEach(async () => {
        await models.sequelize.sync({ force: true });
        user = await models.User.create({
            firstName: 'Kaneza',
            lastName: 'Erica',
            userName: 'Eriallan',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'merchant@example.com',
            password: await bcrypt.hash('Password@123', 10),
        });

        user2 = await models.User.create({
            firstName: 'Kaneza',
            lastName: 'Erica',
            userName: 'Eriallan',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'customer@example.com',
            password: await bcrypt.hash('Password@123', 10),
        });

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

        // Set Roles
        await models.UserRole.create({
            id: uuidv4(),
            userId: user.dataValues.id,
            roleId: merchantRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await models.UserRole.create({
            id: uuidv4(),
            userId: user2.dataValues.id,
            roleId: customerRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        product = await models.Product.create({
            id: uuidv4(),
            userId: user.dataValues.id,
            name: 'Product 1',
            price: 10,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });

        // Start the server and get the JWT token for a buyer
        token = jwt.sign(
            { userId: user2.dataValues.id },
            process.env.SECRET_KEY
        );
    });

    afterEach(async () => {
        await models.Review.destroy({ where: {} });
        await models.User.destroy({ where: {} });
        await models.Product.destroy({ where: {} });
    });
    it('should return 201 if the review is created successfully', async () => {
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
        expect(response.body.Review.userId).to.equal(user2.dataValues.id);
        expect(response.body.Review.productId).to.equal(product.id);
    });

    it('Should return 400 if user has already rated that product', async () => {
        const token = generateToken({ userId: user2.id }, { expiresIn: '1d' });
        await models.Review.create({
            userId: user2.id,
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
        const token = generateToken({ userId: user2.id }, { expiresIn: '1d' });
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
