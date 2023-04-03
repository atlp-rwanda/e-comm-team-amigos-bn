import chai, { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../database/models';
dotenv.config();

chai.use(chaiHttp);
const should = chai.should();

describe('Order Tests', () => {
    let roles, customerUser1, customerUser2, merchantUser, product, product2, adminUser;

    before(async () => {
        await models.sequelize.sync({ force: true });

        adminUser = await models.User.create(
            {
                id: uuidv4(),
                firstName: 'Junior',
                lastName: 'Gasana',
                userName: 'didas___jr',
                telephone: '078000000',
                address: 'Kigali',
                email: 'admin@admin.com',
                password: await bcrypt.hash('Password@123', 10),
                role: 'admin',
                status: 'active',
                verified: 'true',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        )

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

        const customerRole = roles.find((role) => role.name === 'Customer');
        const merchantRole = roles.find((role) => role.name === 'Merchant');

        customerUser1 = await models.User.create({
            firstName: 'Didas',
            lastName: 'Junior',
            userName: 'Junior',
            telephone: '0790994799',
            address: 'Kigali',
            email: 'gasanajr@example.com',
            verified: true,
            active: true,
            password: await bcrypt.hash('Password@123', 10),
        });

        customerUser2 = await models.User.create({
            firstName: 'Didas',
            lastName: 'Junior',
            userName: 'Junior',
            telephone: '0790994799',
            address: 'Kigali',
            email: 'gasanajr08@example.com',
            verified: true,
            active: true,
            password: await bcrypt.hash('Password@123', 10),
        });

        merchantUser = await models.User.create({
            firstName: 'Didas',
            lastName: 'Junior',
            userName: 'Junior',
            telephone: '0790994799',
            address: 'Kigali',
            email: 'x@example.com',
            verified: true,
            active: true,
            password: await bcrypt.hash('Password@123', 10),
        });

        // UserRoles
        await models.UserRole.create({
            // Merchant
            id: uuidv4(),
            userId: customerUser1.id,
            roleId: customerRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // UserRoles
        await models.UserRole.create({
            // Customer
            id: uuidv4(),
            userId: customerUser2.id,
            roleId: customerRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // UserRoles
        await models.UserRole.create({
            // Customer
            id: uuidv4(),
            userId: merchantUser.id,
            roleId: merchantRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        product = await models.Product.create({
            id: uuidv4(),
            userId: merchantUser.id,
            name: 'testProduct',
            price: 40,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });

        product2 = await models.Product.create({
            id: uuidv4(),
            userId: merchantUser.id,
            name: 'testProduct 2',
            price: 40,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });
    });

    after(async () => {
        await models.User.destroy({ where: {} });
        await models.Product.destroy({ where: {} });
        await models.Product.destroy({ where: {} });
        await models.Order.destroy({ where: {} });
    });

    it('Should Create and Checkout an Order', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: customerUser1.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const res = await chai
            .request(app)
            .post('/checkout')
            .send(
                {
                    "products": [
                        {
                            "productId": product.id,
                            "quantity": 1
                        }
                    ],
                    "deliveryInfo": {
                        "address": "123 Main St",
                        "city": "New York",
                        "state": "NY",
                        "zip": "10001",
                    }
                })
            .set('Authorization', 'Bearer ' + token);

        expect(res).to.have.status(200);
        res.body.should.have.property('orderId');
        res.body.should.have.property('orderProducts');
    });

    it('Should delete an order', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: customerUser1.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const order = await chai
            .request(app)
            .post('/orders')
            .send({
                items: [
                    {
                        product: product2.id,
                        quantity: 4,
                        unitProce: product2.price,
                    },
                ],
            })
            .set('Authorization', 'Bearer ' + token);

        const { id } = order.body.data.order;

        const res = await chai
            .request(app)
            .delete(`/orders/${id}`)
            .set('Authorization', 'Bearer ' + token);

        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Order deleted successfully.');
    });

    it('should return the order status for a valid order', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: customerUser1.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const order = await chai
            .request(app)
            .post('/orders')
            .send({
                items: [
                    {
                        product: product2.id,
                        quantity: 4,
                        unitProce: product2.price,
                    },
                ],
            })
            .set('Authorization', 'Bearer ' + token);

        const res = await chai
            .request(app)
            .get(`/orders/orderStatus/${order.body.data.order.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('expectedDeliveryDate');
    });

    it('Should not delete an order if user did not create it', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: customerUser1.email,
            password: 'Password@123',
        });

        const signin2 = await chai.request(app).post('/user/login').send({
            email: customerUser2.email,
            password: 'Password@123',
        });

        let token = signin.body.token;
        let token2 = signin2.body.token;

        const order = await chai
            .request(app)
            .post('/orders')
            .send({
                items: [
                    {
                        product: product2.id,
                        quantity: 4,
                        unitProce: product2.price,
                    },
                ],
            })
            .set('Authorization', 'Bearer ' + token);

        const { id } = order.body.data.order;

        const res = await chai
            .request(app)
            .delete(`/orders/${id}`)
            .set('Authorization', 'Bearer ' + token2);

        expect(res).to.have.status(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal(
            'Access denied! You are not allowed to delete this order'
        );
    });

    it('Should return all orders', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: customerUser1.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const res = await chai
            .request(app)
            .get(`/orders`)
            .set('Authorization', 'Bearer ' + token);

        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        res.body.should.have.property('count');
        res.body.should.have.property('data');
    });

    it('Should update order', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: customerUser1.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const order = await chai
            .request(app)
            .post('/orders')
            .send({
                items: [
                    {
                        product: product.id,
                        quantity: 4,
                        unitProce: product.price,
                    },
                    {
                        product: product2.id,
                        quantity: 4,
                        unitProce: product2.price,
                    },
                ],
            })
            .set('Authorization', 'Bearer ' + token);

        const updateOrder = await chai
            .request(app)
            .put(`/orders/${order.body.data.order.id}`)
            .send({
                items: [
                    {
                        product: product.id,
                        quantity: 4,
                        unitProce: product.price,
                    },
                ],
            })
            .set('Authorization', 'Bearer ' + token);

        expect(order.body.data.order.products.length).to.equal(2);
    });

    it('Should return all orders for Admin', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: adminUser.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const res = await chai
            .request(app)
            .get(`/orders`)
            .set('Authorization', 'Bearer ' + token);

        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        res.body.should.have.property('count');
    });
});
