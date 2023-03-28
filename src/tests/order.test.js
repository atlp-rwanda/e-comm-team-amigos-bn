import chai, { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../database/models';
dotenv.config();

chai.use(chaiHttp);
const should = chai.should();

describe('Order Tests', () => {
    let vendorUser, normalUser1, normalUser2, prod1, prod2;
    before(async () => {
        await models.sequelize.sync({ force: true });
        await models.User.destroy({ where: {} });

        vendorUser = await models.User.create({
            id: uuidv4(),
            firstName: 'vendor',
            lastName: 'vendor',
            userName: 'vendor',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'vendor@example.com',
            verified: true,
            active: true,
            role: 'vendor',
            password: await bcrypt.hash('Password@123', 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        normalUser1 = await models.User.create({
            id: uuidv4(),
            firstName: 'normal1',
            lastName: 'normal1',
            userName: 'normal1',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'normal1@example.com',
            verified: true,
            active: true,
            role: 'normal',
            password: await bcrypt.hash('Password@123', 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        normalUser2 = await models.User.create({
            id: uuidv4(),
            firstName: 'normal2',
            lastName: 'normal2',
            userName: 'normal2',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'normal2@example.com',
            verified: true,
            active: true,
            role: 'normal',
            password: await bcrypt.hash('Password@123', 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Products

        prod1 = await models.Product.create({
            id: uuidv4(),
            userId: vendorUser.dataValues.id,
            name: 'Product 1',
            price: 40,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        prod2 = await models.Product.create({
            id: uuidv4(),
            userId: vendorUser.dataValues.id,
            name: 'Product 2',
            price: 40,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            updatedAt: new Date(),
            updatedAt: new Date(),
        });
    });

    after(async () => {
        await models.User.destroy({ where: {} });
        await models.Product.destroy({ where: {} });
    });

    it('Chould Create an Order', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: normalUser1.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const res = await chai
            .request(app)
            .post('/orders')
            .send({
                items: [
                    {
                        product: prod1.dataValues.id,
                        quantity: 4,
                        unitProce: prod1.price,
                    },
                    {
                        product: prod2.dataValues.id,
                        quantity: 40,
                        unitProce: prod2.price,
                    },
                ],
            })
            .set('Authorization', 'Bearer ' + token);

        expect(res).to.have.status(201);
        expect(res.body.status).to.equal('success');
        res.body.should.have.property('data');
    });

    it('Should delete an order', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: normalUser1.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const order = await chai
            .request(app)
            .post('/orders')
            .send({
                items: [
                    {
                        product: prod1.dataValues.id,
                        quantity: 4,
                        unitProce: prod1.price,
                    },
                    {
                        product: prod2.dataValues.id,
                        quantity: 40,
                        unitProce: prod2.price,
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

    it('Should not delete an order if user did not create it', async () => {
        const signin = await chai.request(app).post('/user/login').send({
            email: normalUser1.email,
            password: 'Password@123',
        });

        const signin2 = await chai.request(app).post('/user/login').send({
            email: normalUser2.email,
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
                        product: prod1.dataValues.id,
                        quantity: 4,
                        unitProce: prod1.price,
                    },
                    {
                        product: prod2.dataValues.id,
                        quantity: 40,
                        unitProce: prod2.price,
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
            email: normalUser1.email,
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
            email: normalUser1.email,
            password: 'Password@123',
        });

        let token = signin.body.token;

        const orders = await chai
            .request(app)
            .get('/orders')
            .set('Authorization', 'Bearer ' + token);

        const order = await chai
            .request(app)
            .put(`/orders/${orders.body.data.orders[0].id}`)
            .send({
                items: [
                    {
                        product: prod1.dataValues.id,
                        quantity: 4,
                        unitProce: prod1.price,
                    },
                ],
            })
            .set('Authorization', 'Bearer ' + token);

        expect(order.body.data.order.products.length).to.equal(1);
    });
});
