import chai, { expect } from "chai";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import app from "../app";
import models from '../database/models';

chai.use(chaiHttp);


describe('Order API', () => {

describe('getOrderStatus', () => {
let orderId;
let token;
let product;
let user;
let order;
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
            role: 'normal',
          });
          product= await models.Product.create({
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
        // Start the server and get the JWT token for a buyer
        token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);
    
        // Create a new order for the buyer
    
        const res= await chai
        .request(app).post(`/orders`).send({
           items: [{
                product:product.id,
                quanity:4,
                price: 10
            }],

        }).set("Authorization","Bearer "+token)
          orderId= res.body.data.order.id
    
      });
    after(async () => {
        await models.Order.destroy({ where: {} })
        await models.Product.destroy({ where: {} });
        await models.User.destroy({ where: {} });
      });
    it('should return the order status for a valid order', async () => {
        
      const res = await chai
        .request(app)
        .get(`/orders/orderStatus/${orderId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('expectedDeliveryDate');
    });

    it('should return an error for an invalid orderId', async () => {
        const fakeId= "506f94a2-635b-4d86-8272-67d26a59c2";
      const res = await chai
        .request(app)
        .get(`/orders/orderStatus/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('message');
    });
  });

describe('updateOrderStatus', () => {
let orderId;
let token;
let product;
let user;
let order;
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
            role: 'admin',
          });
          product= await models.Product.create({
            id: uuidv4(),
            userId: user.id,
            name: 'Product 1',
            price: 10,
            quantity: 5,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
          });
        // Start the server and get the JWT token for a buyer
        token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);

        // agent=chai.request.agent(app)
        // await agent.post(`/orders/?productId=${product.id}&quantity=${3}&price=${10}`).set("Authorization","Bearer "+token)
    
        // Create a new order for the buyer
        const res= await chai
        .request(app).post(`/orders`).send({
           items: [{
                product:product.id,
                quanity:4,
                price: 10
            }],

        }).set("Authorization","Bearer "+token)
          orderId= res.body.data.order.id
    
      });
      after(async () => {
        await models.Order.destroy({ where: {} })
        await models.Product.destroy({ where: {} });
        await models.User.destroy({ where: {} });
      });

    it('should update the order status for a valid order', async () => {
      const res = await chai
        .request(app)
        .put(`/orders/orderStatus/${orderId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'shipped' });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('status', 'shipped');
      expect(res.body).to.have.property('expectedDeliveryDate');
    });

    it('should return an error for an invalid order', async () => {
        const fakeId= "206f94a2-635b-4d86-8272-67d26a59c2";
      const res = await chai
        .request(app)
        .put(`/orders/orderStatus/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'shipped' });
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('message');
    });

    it('should return an error for an invalid status', async () => {
      const res = await chai
        .request(app)
        .put(`/orders/orderStatus/${orderId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'invalid' });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message');
    });
  });
});
