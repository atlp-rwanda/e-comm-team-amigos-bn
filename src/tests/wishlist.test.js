import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../database/models';
import app from '../app';

chai.use(chaiHttp);

describe('addToWishlist', () => {
    let user;
    let product;
    let token;
    before(async () => {
        await models.sequelize.sync({ force: true });
        user = await models.User.create({
            firstName: 'test1',
            lastName: 'test2',
            userName: 'test3',
            telephone: '123456789',
            address: 'kacyiru',
            email: 'test1@example.com',
            password: await bcrypt.hash('Password@123', 10),
        });
        product = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
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
        user = user.toJSON();

        token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
    });

    it('should add product to wishlist', async () => {
        const res = await chai
            .request(app)
            .post(`/wishlist/add/${product.id}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.have.equal(
            'Product has been added to your wishlist'
        );
    });

    it('should return 404 when product is not found', async () => {
        const res = await chai
            .request(app)
            .post(`/wishlist/add/${uuidv4()}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.have.equal('Product not found');
    });
    it('should return a 401 error when authentication token is missing', async () => {
        const res = await chai.request(app).post(`/wishlist/add/${product.id}`);
        expect(res.statusCode).to.equal(401);
    });

    it('should return 409 when product is already in wishlist', async () => {
        const res = await chai
            .request(app)
            .post(`/wishlist/add/${product.id}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.statusCode).to.equal(409);
        expect(res.body.message).to.have.equal('Product already in wishlist');
    });
});

describe('removeFromWishlist', () => {
    let user;
    let product;
    let token;
    before(async () => {
        await models.sequelize.sync({ force: true });
        user = await models.User.create({
            firstName: 'test1',
            lastName: 'test2',
            userName: 'test3',
            telephone: '123456789',
            address: 'kacyiru',
            email: 'test1@example.com',
            password: await bcrypt.hash('Password@123', 10),
        });
        user = user.toJSON();
        product = await models.Product.create({
            id: uuidv4(),
            userId: user.id,
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
        product = product.toJSON();

        token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
    });

    it('should first add product to wishlist', async () => {
        const res = await chai
            .request(app)
            .post(`/wishlist/add/${product.id}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.have.equal(
            'Product has been added to your wishlist'
        );
    });

    it('should remove product from wishlist', async () => {
        const res = await chai
            .request(app)
            .delete(`/wishlist/remove/${product.id}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.have.equal(
            'Product has been removed from your wishlist'
        );
    });

    it('should return 404 when product is not found', async () => {
        const res = await chai
            .request(app)
            .delete(`/wishlist/remove/${uuidv4()}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.statusCode).to.equal(404);
    });
    it('should return a 401 error when authentication token is missing', async () => {
        const res = await chai
            .request(app)
            .delete(`/wishlist/remove/${product.id}`);
        expect(res.statusCode).to.equal(401);
    });

    it('should return 404 when product id not found', async () => {
        const res = await chai
            .request(app)
            .delete(`/wishlist/remove/${uuidv4()}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.statusCode).to.equal(404);
    });
});
