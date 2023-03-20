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
dotenv.config();
let user;
let product;

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

  it('should return a list of all products', (done) => {
    chai.request(app)
      .get('/product/getAllItems')
      .end((err, res) => {
        if (err) throw err;
        else {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('Status').to.equal('OK');
          expect(res.body)
            .to.have.property('Message')
            .to.equal('List of all Products in our collections');
          expect(res.body)
            .to.have.property('listProduct')
            .to.be.an('array');
          done();
        }
      });
  });

  it('should return an error message if there are no products', async () => {
    await models.Product.destroy({ where: {} });
    chai.request(app)
      .get('/product/getAllItems')
      .end((err, res) => {
        if (err) throw err;
        else {
          expect(res.status).to.equal(404);
          expect(res.body)
            .to.have.property('Status')
            .to.equal('Not Found');
          expect(res.body)
            .to.have.property('error')
            .to.equal('There is no product in Stock');
        }
      });
  });
});

describe('addProduct function', () => {
  let user;
  before(async () => {
    await models.sequelize.sync();
    await models.User.destroy({ where: {} });
    await models.Product.destroy({ where: {} });
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
  });
  after(async () => {
    await models.Product.destroy({ where: {} });
  });
  it('should create a new product with valid data', async () => {
    const token = jwt.sign(
      { userId: user.id, userRole: 'vendor' },
      process.env.SECRET_KEY
    );
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
      .set('Authorization', `Bearer ${token}`);
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
    const token = jwt.sign(
      { userId: user.id, userRole: 'vendor' },
      process.env.SECRET_KEY
    );
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
    expect(res.body.message).to.equal('Authorization header missing');
  });
  it('should return an error if unauthorized access', async () => {
    const token = jwt.sign(
      { userId: user.id, userRole: 'customer' },
      process.env.SECRET_KEY
    );
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
    expect(res.body.message).to.equal('Unauthorized access');
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

  describe('PUT /product/availableProduct/:id', () => {
    it('should update the availability of a product', async () => {
      product = await models.Product.findOne({
        where: { name: 'Product 1' },
      });
      const res = await chai
        .request(app)
        .put(`/product/availableProduct/${product.id}`)
        .send({ available: false });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('message', 'updated successfully');
      const updatedProduct = await models.Product.findByPk(product.id);
      expect(updatedProduct).to.have.property('available', false);
    });

    it('should return an error for an invalid product ID', async () => {
      const id = '1860xy';
      const res = await chai
        .request(app)
        .put(`/product/availableProduct/${id}`)
        .send({ available: false });
      expect(res.statusCode).to.equal(500);
      expect(res.body).to.have.property('error', 'Internal server error');
    });

    it('should return an error for an invalid availability status', async () => {
      product = await models.Product.findOne({
        where: { name: 'Product 1' },
      });
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
});

describe('Get product in seller collection', () => {
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
      userId: user.id,
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
  });

  after(async () => {
    await models.User.destroy({ where: {} });
    await models.Product.destroy({ where: {} });
  });
  it('should return all products for a seller', (done) => {
    const token = jwt.sign(
      { userId: user.id, userRole: 'vendor' },
      process.env.SECRET_KEY
    );
    chai.request(app)
      .get('/product/collection')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) throw err;
        else {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal('OK');
          expect(res.body.items).to.be.an('array');
          done();
        }
      });
  });

  it('should return 404 if seller has no products', async () => {
    await models.Product.destroy({ where: {} });
    const token = jwt.sign(
      { userId: user.id, userRole: 'vendor' },
      process.env.SECRET_KEY
    );
    chai.request(app)
      .get('/product/collection')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) throw err;
        else {
          expect(res).to.have.status(404);
          expect(res.body.status).to.equal('Not Found');
          expect(res.body.error).to.equal(
            'There is no item in Collection'
          );
        }
      });
  });

  it('should return 400 if userID is invalid or role', () => {
    const token = jwt.sign(
      { userId: '83018347', userRole: 'customer' },
      process.env.SECRET_KEY
    );
    chai.request(app)
      .get('/product/collection')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) throw err;
        else {
          expect(res).to.have.status(400);
          expect(res.body.status).to.equal('Bad Request');
          expect(res.body.error).to.not.be.empty;
        }
      });
  });
});
describe('GET /product/search', () => {
  it('should return a list of products matching with certain criteria', async () => {
    const user = await models.User.create({
      firstName: 'Kaneza',
      lastName: 'Erica',
      userName: 'Eriallan',
      telephone: '0785188981',
      address: 'Kigali',
      email: 'eriman@example.com',
      password: await bcrypt.hash('Password@123', 10),
      role: 'vendor',
    });
    const product1 = await models.Product.create({
      id: uuidv4(),
      userId: user.id,
      name: 'LG TV',
      price: 15,
      quantity: 10,
      available: true,
      category: 'TV',
      bonus: 1,
      expiryDate: '2023-12-31T00:00:00.000Z',
      ec: 1,
      images: [
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg',
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg',
        'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg',
      ],
    });
    const product2 = await models.Product.create({
      id: uuidv4(),
      userId: user.id,
      name: 'test TV',
      price: 100,
      quantity: 10,
      available: true,
      category: 'TV',
      bonus: 1,
      expiryDate: '2023-12-31T00:00:00.000Z',
      ec: 1,
      images: [
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__480.jpg',
        'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__480.jpg',
        'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg',
      ],
    });
    const res = await chai
      .request(app)
      .get('/product/search')
      .query({ name: 'LG TV', minPrice: 15, category: 'TV' });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('status', 'Ok');
    expect(res.body).to.have.property(
      'message',
      'List Of Products matching your search'
    );
    expect(res.body).to.have.property('products').to.be.an('array');
    expect(res.body.products).to.have.lengthOf(1);
    expect(res.body.products[0]).to.have.property('name', 'LG TV');
    expect(res.body.products[0]).to.have.property('price', 15);
    expect(res.body.products[0]).to.have.property('category', 'TV');
  });
  it('should return a 404 error when no products match the search criteria', async () => {
    const res = await chai.request(app).get('/product/search').query({
      name: 'non-existent product',
      category: 'Non-existent Category',
    });

    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('status', 'Not Found');
    expect(res.body).to.have.property(
      'error',
      'There are no products matching your search'
    );
  });
});
