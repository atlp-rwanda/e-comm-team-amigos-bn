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

describe('Cart Tests', function () {
    let product;
    let user;
    let agent;
    let roles;
    before(async function () {
        await models.sequelize.sync({ force: true });

        user = await models.User.create({
            id: uuidv4(),
            firstName: 'Kaneza',
            lastName: 'Erica',
            userName: 'Eriallan',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'eriman@example.com',
            password: await bcrypt.hash('Password@123', 10),
        });

        product = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
            name: 'Product 1',
            price: 10,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: [
                'https://picums.photos/200',
                'https://picums.photos/201',
                'https://picums.photos/202',
                'https://picums.photos/203',
            ],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });
    });

    it('Should return an error if no token sent', async function () {
        const res = await chai
            .request(app)
            .post(`/cart/?productId=${uuidv4()}&quantity=${1}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('No token provided!');
    });

    it('Should return an error if a product does not exist', async function () {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

        const res = await chai
            .request(app)
            .post(`/cart/?productId=${uuidv4()}&quantity=${1}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Product does not exist..');
    });

    it('Should add a cart of valid users only', async function () {
        const token = jwt.sign({ userId: uuidv4() }, process.env.SECRET_KEY);

        const res = await chai
            .request(app)
            .post(`/cart/?productId=${uuidv4()}&quantity=${1}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(
            'There is no user with token provided.'
        );
    });

    it('Should return an error if quantity is less than 1', async function () {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

        const res = await chai
            .request(app)
            .post(`/cart/?productId=${product.id}&quantity=${0}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Quantity cannot be null..');
    });
    it('Should add items to the cart', async function () {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

        agent = chai.request.agent(app);
        const res = await agent
            .post(`/cart/?productId=${product.id}&quantity=${1}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('cart saved');
        expect(res.body.cart).to.be.a.instanceof(Array);
    });

    it('Should not add an existing product in the cart', async function () {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

        const res = await agent
            .post(`/cart/?productId=${product.id}&quantity=${1}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(
            'Product in cart already. Please update the cart.'
        );
    });
});

describe('View shopping cart test', function () {
    let product;
    let user;
    let agent;
    before(async function () {
        await models.sequelize.sync({ force: true });

        user = await models.User.create({
            firstName: 'Kaneza',
            lastName: 'Erica',
            userName: 'Eriallan',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'eriman@example.com',
            password: await bcrypt.hash('Password@123', 10),
        });

        product = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
            name: 'Product 1',
            price: 10,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: [
                'https://picums.photos/200',
                'https://picums.photos/201',
                'https://picums.photos/202',
                'https://picums.photos/203',
            ],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        agent = chai.request.agent(app);
        await agent
            .post(`/cart/?productId=${product.id}&quantity=${1}`)
            .set('Authorization', `bearer ${token}`);
    });

    it('returns the correct cart items when there are items in the cart', async () => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        const res = await agent
            .get('/cart/view-cart')
            .send()
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Cart Items');
    });

    it('Should return an error if a product does not exist', async () => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        const res = await chai
            .request(app)
            .get('/cart/view-cart')
            .send()
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(204);
    });
});

describe('updateCart function', () => {
    let agent;
    let user;
    let productId;
    let product;

    before(async () => {
        await models.sequelize.sync({ force: true });

        user = await models.User.create({
            firstName: 'Kaneza',
            lastName: 'Erica',
            userName: 'Eriallan',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'eriman@example.com',
            password: await bcrypt.hash('Password@123', 10),
        });

        product = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
            name: 'Product 1',
            price: 10,
            quantity: 5,
            available: true,
            category: 'food',
            bonus: 20,
            images: [
                'https://picums.photos/200',
                'https://picums.photos/201',
                'https://picums.photos/202',
                'https://picums.photos/203',
            ],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });

        productId = product.id;
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        agent = chai.request.agent(app);
        await agent
            .post(`/cart/?productId=${productId}&quantity=${3}`)
            .set('Authorization', 'Bearer ' + token);
    });

    it('should update the quantity of an item in the cart', async () => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        const res = await agent
            .put(`/cart/updateCart/${productId}`)
            .send({ quantity: 3 })
            .set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Cart updated');
    });

    it('should return an error if the item is not found in the cart', async () => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        const res = await agent
            .put(`/cart/updateCart/${productId + 1}`)
            .send({ quantity: 3 })
            .set('Authorization', 'Bearer ' + token);

        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Item not found in cart');
    });

    it('should return an error if the quantity is not a positive integer', async () => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        const res = await agent
            .put(`/cart/updateCart/${productId}`)
            .send({ quantity: -1 })
            .set('Authorization', 'Bearer ' + token);

        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Invalid quantity');
    });
});

describe('Clear Cart', () => {
    let prod, merchant, customer, agent, token, token2;
    let roles;

    before(async () => {
        await models.sequelize.sync({ force: true });
        await models.Role.destroy({ where: {} });
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

        merchant = await models.User.create({
            firstName: 'seller',
            lastName: 'seller',
            userName: 'seller',
            telephone: '0785188981',
            address: 'Kigali',
            verified: true,
            email: 'seller@example.com',
            password: await bcrypt.hash('Password@123', 10),
        });

        customer = await models.User.create({
            firstName: 'merchant',
            lastName: 'merchant',
            userName: 'merchant',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'merchant@example.com',
            verified: true,
            password: await bcrypt.hash('Password@123', 10),
        });

        await models.UserRole.create({
            id: uuidv4(),
            userId: merchant.dataValues.id,
            roleId: merchantRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await models.UserRole.create({
            id: uuidv4(),
            userId: customer.dataValues.id,
            roleId: customerRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        prod = await models.Product.create({
            id: uuidv4(),
            userId: merchant.dataValues.id,
            name: 'Product 1',
            price: 10,
            quantity: 5,
            available: true,
            category: 'food',
            bonus: 20,
            images: [
                'https://picums.photos/200',
                'https://picums.photos/201',
                'https://picums.photos/202',
                'https://picums.photos/203',
            ],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });

        token = jwt.sign({ userId: customer.id }, process.env.SECRET_KEY);
        token2 = jwt.sign({ userId: merchant.id }, process.env.SECRET_KEY);

        agent = chai.request.agent(app);
        await agent
            .post(`/cart/?productId=${prod.dataValues.id}&quantity=${3}`)
            .set('Authorization', 'Bearer ' + token);
    });

    it('should return status 401 if user is not authenticated', (done) => {
        agent.delete('/cart/clean-up-cart').end((err, res) => {
            res.should.have.status(401);
            done();
        });
    });

    it('should return status 403 if user is not authorized', (done) => {
        agent
            .delete('/cart/clean-up-cart')
            .set('Authorization', 'Bearer ' + token2)
            .end((err, res) => {
                res.should.have.status(403);
                expect(res.body.message).to.equal(
                    'Access denied! You are not allowed to perform this operation.'
                );
                done();
            });
    });

    it('should clean up the cart if user is authenticated and authorized', async function () {
        const res = await agent
            .delete('/cart/clean-up-cart')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message');
    });
});
