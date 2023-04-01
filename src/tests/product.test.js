import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../database/models';
import app from '../app';
import tokenGenerator from '../helpers/generateToken';
chai.use(chaiHttp);
let user;


describe('get All Product', () => {
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
            role: 'vendor',
        });
        await models.Product.create({
            id: uuidv4(),
            userId: user.id,
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
    });
    after(async () => {
        await models.Product.destroy({ where: {} });
        await models.User.destroy({ where: {} });
    });

    it('should return a list of all products', (done) => {
        chai.request(app)
            .get('/product')
            .end((err, res) => {
                if (err) throw err;
                else {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('Status').to.equal('OK');
                    expect(res.body)
                        .to.have.property('Message')
                        .to.equal('List of all Products in our collections');
                    expect(res.body.responseData)
                        .to.have.property('listProduct')
                        .to.be.an('array');
                    expect(res.body.responseData)
                        .to.have.property('listProduct')
                        .to.be.an('array');
                    done();
                }
            });
    });

    it('should return an error message if there are no products', async () => {
        await models.Product.destroy({ where: {} });
        const res = await chai.request(app).get('/product');

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('Status').to.equal('Not Found');
        expect(res.body)
            .to.have.property('error')
            .to.equal('There is no product in Stock');
    });
});


describe('Available Product API', () => {
    let user;
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
            role: 'vendor',
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
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });
    });
    after(async () => {
        await models.Product.destroy({ where: {} });
        await models.User.destroy({ where: {} });
    });
});

describe('GET /product/availableProduct', () => {
    let userOne, userTwo, userThree, userFour;
    let p1, p2, p3, p4, roles;

    before(async () => {
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
        const adminRole = roles.find((role) => role.name === 'Admin');
        // Users
        userOne = await models.User.create({
            id: uuidv4(),
            firstName: 'Eric',
            lastName: 'Ndungutse',
            userName: 'eric_dnungutse',
            telephone: '0785283007',
            address: 'Muhanga',
            email: 'dav.ndungutse@gmail.com',
            password: await bcrypt.hash('Password@123', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        userTwo = await models.User.create({
            id: uuidv4(),
            firstName: 'wilbrord',
            lastName: 'ibyimana',
            userName: 'wilb',
            telephone: '0780908888',
            billingAddress: 'Kigali',
            address: 'Kigali',
            email: 'bwilbrord@example.com',
            password: await bcrypt.hash('Wilbrord@213', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        userThree = await models.User.create({
            id: uuidv4(),
            firstName: 'Jimmy',
            lastName: 'Kubwimana',
            userName: 'jkubwimana',
            billingAddress: 'Kigali',
            telephone: '0780909788',
            address: 'Kigali',
            email: 'jimmyd@gmail.com',
            password: await bcrypt.hash('Wilbrord@213', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        userFour = await models.User.create({
            id: uuidv4(),
            firstName: 'Normal',
            lastName: 'User',
            userName: 'normal_user',
            telephone: '0789457437',
            address: 'Kigali',
            email: 'normal@example.com',
            password: await bcrypt.hash('Normal@213', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // UserRoles
        await models.UserRole.bulkCreate([
            {
                // Merchant
                id: uuidv4(),

                userId: userTwo.id,
                roleId: merchantRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                // Merchant
                id: uuidv4(),
                userId: userThree.id,
                roleId: merchantRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                // Customer
                id: uuidv4(),
                userId: userFour.id,
                roleId: customerRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                // Admin
                id: uuidv4(),
                userId: userOne.id,
                roleId: adminRole.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Products
        p1 = await models.Product.create({
            id: uuidv4(),
            userId: userTwo.id,
            name: 'Product 1',
            price: 10,
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

        p2 = await models.Product.create({
            id: uuidv4(),
            userId: userTwo.id,
            name: 'Product 1.2',
            price: 0,
            quantity: 1,
            available: false,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        p3 = await models.Product.create({
            id: uuidv4(),
            userId: userThree.id,
            name: 'Product 2',
            price: 100,
            quantity: 2,
            available: true,
            category: 'Glocery',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        p4 = await models.Product.create({
            id: uuidv4(),
            userId: userThree.id,
            name: 'Product 2.1',
            price: 100,
            quantity: 0,
            available: false,
            category: 'Glocery',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });

    after(async () => {
        await models.User.destroy({ where: {} });
        await models.Product.destroy({ where: {} });
    });
    it('should return a list of available products', async () => {
        const res = await chai
            .request(app)
            .get('/product/availableProduct');
        expect(res.statusCode).to.equal(200);
        expect(res.body.response).to.be.an('object');
        expect(res.body.response).to.have.property('currentPage');
        expect(res.body.response).to.have.property('totalPages');
        expect(res.body.response).to.have.property('products');
        expect(res.body.response.products).to.be.a('array');
    });
});

after(async () => {
    await models.User.destroy({ where: {} });
    await models.Product.destroy({ where: {} });
});
it('should return a list of available products', async () => {
    const res = await chai.request(app).get('/product/availableProduct');
    expect(res.statusCode).to.equal(200);
    expect(res.body.response).to.be.an('object');
    expect(res.body.response).to.have.property('currentPage');
    expect(res.body.response).to.have.property('totalPages');
    expect(res.body.response).to.have.property('products');
    expect(res.body.response.products).to.be.a('array');
});

describe('PUT /product/availableProduct/:id', () => {
    let roles, user, product;
    before(async () => {
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

        user = await models.User.create({
            id: uuidv4(),
            firstName: 'Normal',
            lastName: 'User',
            userName: 'normal_user',
            telephone: '0789457437',
            address: 'Kigali',
            email: 'normal@example.com',
            password: await bcrypt.hash('Normal@213', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await models.UserRole.create({
            // Merchant
            id: uuidv4(),
            userId: user.id,
            roleId: merchantRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        product = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
            name: 'Product 2',
            price: 100,
            quantity: 2,
            available: true,
            category: 'Glocery',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });

    it('should update the availability of a product', async () => {
        console.log(product.id);
        const res = await chai
            .request(app)
            .put(`/product/availableProduct/${product.id}`)
            .send({ available: false });

        expect(res.status).to.equal(200);

        expect(res.body.message).to.equal('updated successfully');
    });

    it('should return an error for an invalid product ID', async () => {
        let id = '1860xy';
        const res = await chai
            .request(app)
            .put(`/product/availableProduct/${id}`)
            .send({ available: false });

        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property('error', 'Internal server error');
    });

    it('should return an error for an invalid availability status', async () => {
        const res = await chai
            .request(app)
            .put(`/product/availableProduct/${product.id}`)
            .send({ available: 'invalid-status' });

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property(
            'error',
            'Invalid availability status'
        );
    });
});


describe('addProduct function', () => {
    let merchantUser, roles, customerUser;
    let token, otp;

    before(async () => {
        await models.sequelize.sync({ force: true });
        await models.User.destroy({ where: {} });
        await models.Product.destroy({ where: {} });

        merchantUser = await models.User.create({
            id: uuidv4(),
            firstName: 'Merchant',
            lastName: 'Seller',
            userName: 'mercSeller',
            telephone: '0780908888',
            billingAddress: 'Kigali',
            address: 'Kigali',
            email: 'seller@gexample.com',
            password: await bcrypt.hash('Seller@213', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        customerUser = await models.User.create({
            id: uuidv4(),
            firstName: 'Customer',
            lastName: 'consumer',
            userName: 'custconsumer',
            telephone: '0780908888',
            billingAddress: 'Kigali',
            address: 'Kigali',
            email: 'customer@gexample.com',
            password: await bcrypt.hash('Customer@213', 10),
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
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

        // Merchant User
        await models.UserRole.create({
            id: uuidv4(),
            userId: merchantUser.id,
            roleId: merchantRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Customer User
        await models.UserRole.create({
            id: uuidv4(),
            userId: customerUser.id,
            roleId: customerRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });

    after(async () => {
        await models.Product.destroy({ where: {} });
    });

    it('should create a new product with valid data', async () => {
        const userLogin = await chai.request(app).post('/user/login').send({
            email: 'seller@gexample.com',
            password: 'Seller@213',
        });

        otp = userLogin.body.otp.otp;

        // Check OTP
        const checkOtp = await chai.request(app).post('/user/otp').send({
            email: 'seller@gexample.com',
            otp,
        });

        token = checkOtp.body.token;

        const res = await chai
            .request(app)
            .post('/product/create')
            .send({
                name: 'Test Product',
                price: 100,
                quantity: 10,
                available: true,
                category: 'Test Category',
                bonus: 1,
                expiryDate: '2023-12-31T00:00:00.000Z',
                ec: 1,
                images: [
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                    'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg',
                    'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg',
                    'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg',
                ],
            })
            .set('Authorization', 'Bearer ' + token);

        expect(res).to.have.status(201);
        expect(res.body.name).to.equal('Test Product');
        expect(res.body.price).to.equal(100);
        expect(res.body.quantity).to.equal(10);
        expect(res.body.available).to.equal(true);
        expect(res.body.category).to.equal('Test Category');
        expect(res.body.bonus).to.equal(1);
        expect(res.body.expiryDate).to.equal('2023-12-31T00:00:00.000Z');
        expect(res.body.ec).to.equal(1);
        expect(res.body.images).to.have.lengthOf(4);
    });

    it('should return an error if product name already exists', async () => {
        const res = await chai
            .request(app)
            .post('/product/create')
            .send({
                name: 'Test Product',
                price: 100,
                quantity: 10,
                available: true,
                category: 'Test Category',
                bonus: 1,
                expiryDate: '2023-12-31',
                ec: 1,
                images: [
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                    'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg',
                    'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg',
                    'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg',
                ],
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal(
            'Product already exists you can update that product instead'
        );
    });

    it('should return an error if authorization token is missing', async () => {
        const res = await chai
            .request(app)
            .post('/product/create')
            .send({
                name: 'Test Product',
                price: 100,
                quantity: 10,
                available: true,
                category: 'Test Category',
                bonus: 1,
                expiryDate: '2023-12-31',
                ec: 1,
                images: [
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
                    'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg',
                    'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg',
                    'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg',
                ],
            });
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('No token provided!');
    });

    it('should return an error if unauthorized access', async () => {
        // Login
        const user = await chai.request(app).post('/user/login').send({
            email: 'customer@gexample.com',
            password: 'Customer@213',
        });

        const token = user.body.token;

        const res = await chai
            .request(app)
            .post('/product/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Product Test',
                price: 100,
                quantity: 10,
                available: true,
                category: 'Test',
                bonus: 1,
                expiryDate: '2023-03-16',
                ec: '1234567890123456',
            });
        expect(res).to.have.status(403);
        expect(res.body.message).to.equal(
            'Access denied! You are not allowed to perform this operation.'
        );
    });
});
describe('checkExpiredProducts', () => {
    let user;
    let product1;
    let product2;
    let product3;

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
            role: 'vendor',
        });
        product1 = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
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
        product2 = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
            name: 'Product 2',
            price: 10,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2022-12-31T00:00:00.000Z',
            ec: 30,
        });
        product3 = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
            name: 'Product 2',
            price: 10,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2022-12-31T00:00:00.000Z',
            ec: 30,
        });
    });

    after(async () => {
        await models.Product.destroy({ where: {} });
        await models.User.destroy({ where: {} });
    });

    it('should not mark unexpired products as unavailable', async () => {
        const response = await chai
            .request(app)
            .get('/product/check-expired-products')
            .send();

        expect(response.status).to.equal(200);

        const updatedProduct = await models.Product.findByPk(product1.id);
        expect(updatedProduct.available).to.equal(true);
        const updatedProduct3 = await models.Product.findByPk(product3.id);
        console.log(updatedProduct3)
        expect(updatedProduct3.available).to.equal(false);
    });
    it('should return an empty array if there are no expired products', async () => {
        // Set the expiry date for both products to a future date
        await product1.update({ expiryDate: '2024-12-31T00:00:00.000Z' });
        await product2.update({ expiryDate: '2024-12-31T00:00:00.000Z' });

        const response = await chai
            .request(app)
            .get('/product/check-expired-products')
            .send();

        expect(response.status).to.equal(200);
    });

    it('should mark all expired products as unavailable', async () => {
        const response = await chai
            .request(app)
            .get('/product/check-expired-products')
            .send();

        expect(response.status).to.equal(200);

        const updatedProduct1 = await models.Product.findByPk(product1.id);
        const updatedProduct2 = await models.Product.findByPk(product2.id);
        expect(updatedProduct1.available).to.equal(true);
        expect(updatedProduct2.available).to.equal(false);
    });
});

