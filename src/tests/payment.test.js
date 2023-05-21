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

  const checkout = {
    "userId": "1c9d560d-a45c-45f8-a55b-3856aaf74e1d",
    "cartItems": [
        {
            "id": "0fbdad03-4d9a-4597-b35c-2ab9ccc7c2a5",
            "name": "Head-set",
            "price": 2500,
            "quantity": 2,
            "images": [
                "https://firebasestorage.googleapis.com/v0/b/amigos-product-images.appspot.com/o/headeset.png_3c188417-b436-448c-a726-433d9dea6378%2Fheadeset.png_3c188417-b436-448c-a726-433d9dea6378?alt=media&token=8fd924c1-c629-46e7-9c4e-a7144026ad70",
            ]
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
            .send({checkout})
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.equal(200);
    })
});