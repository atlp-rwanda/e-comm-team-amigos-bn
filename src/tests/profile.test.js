import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import app from '../app';
import models from '../database/models';

dotenv.config();
chai.use(chaiHttp);

describe('Profile Checks', () => {
  let user;

  before(async () => {
    await models.sequelize.sync({ force: true });
    const res = await chai.request(app).post('/user/create').send({
      firstName: 'Manzi',
      lastName: 'Evariste',
      userName: 'Manzi212',
      telephone: '0785188981',
      address: 'Kiyovu',
      email: 'evaristeee@gmail.com',
      password: 'Password@123',
    });

    user = res.body;
  });

  after(async () => {
    await models.User.destroy({ where: {} });
  });

  it('should update user profile', async () => {
    const res = await chai
      .request(app)
      .patch('/user/updateMe')
      .send({
        firstName: 'Eric',
        lastName: 'Ndungutse',
        address: 'Kigali, Rwanda',
        telephone: '250785439850',
        billingAddress: 'Kigali, Rwanda',
        preferredLanguage: 'English',
        birthdate: '2002-12-27',
        preferredCurrency: 'Frw',
        gender: 'Male',
      })
      .set('Authorization', `Bearer ${user.token}`);

    expect(res.body.status).to.equal('success');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('profile');
  });

  it('should get my profile', async () => {
    const res = await chai
      .request(app)
      .get('/user/profile')
      .set('Authorization', `Bearer ${user.token}`);

    expect(res.body.status).to.equal('success');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('profile');
    expect(res.body.profile.telephone).to.equal('250785439850');
  });

  it('should get user profile', async () => {
    const res = await chai
      .request(app)
      .get(`/user/${user.data.id}`)
      .set('Authorization', `Bearer ${user.token}`);

    expect(res.body.status).to.equal('success');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('user');
    expect(res.body.user.telephone).to.equal('250785439850');
  });
});
