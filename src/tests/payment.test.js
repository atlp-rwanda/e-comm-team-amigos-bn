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

describe('Payment Tests', function () {

  const order = {
    "orderId": "5dfe12f3-f954-48a1-8b91-c9426eaf8720",
    "orderProducts": [
        {
            "orderId": "5dfe12f3-f954-48a1-8b91-c9426eaf8720",
            "productId": "ec05a93c-2684-4bdd-b0d3-9939e7f54d72",
            "name": "T-shirt",
            "quantity": 1,
            "unitPrice": 5000
        }
    ]
  }

  let user;

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
    });

    it('Should return a stripe payment UI', async function () {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        const res = await chai
            .request(app)
            .post(`/payment`)
            .send({order})
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
    })
});