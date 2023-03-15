import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../database/models';
import app from '../app';
import tokenGenerator from '../helpers/generateToken';

dotenv.config();
chai.use(chaiHttp);
const should = chai.should();

describe('createUser function', () => {
  before(async () => {
    await models.sequelize.sync();
    await models.User.destroy({ where: {} });
    await models.User.create({
      firstName: 'Kaneza',
      lastName: 'Erica',
      userName: 'Eriallan',
      telephone: '0785188981',
      address: 'Kigali',
      email: 'eriman@example.com',
      password: await bcrypt.hash('Password@123', 10),
    });
  });

  it('should create a new user with valid data', async () => {
    const res = await chai.request(app).post('/user/create').send({
      firstName: 'Manzi',
      lastName: 'Evariste',
      userName: 'Manzi212',
      telephone: '0785188981',
      address: 'Kiyovu',
      email: 'evaristeee@gmail.com',
      password: 'Password@123',
    });
    expect(res).to.have.status(201);
    expect(res.body.message).to.equal('Account created successfully');
    expect(res.body.data).to.have.property('id');
    expect(res.body.data.firstName).to.equal('Manzi');
    expect(res.body.data.lastName).to.equal('Evariste');
    expect(res.body.data.userName).to.equal('Manzi212');
    expect(res.body.data.telephone).to.equal('0785188981');
    expect(res.body.data.address).to.equal('Kiyovu');
    expect(res.body.data.email).to.equal('evaristeee@gmail.com');
    expect(res.body).to.have.property('token');
  });

  it('should return an error if email is already in use', async () => {
    const res = await chai.request(app).post('/user/create').send({
      firstName: 'Manzi',
      lastName: 'Evariste',
      userName: 'Manzi212',
      telephone: '0785188981',
      address: 'Kiyovu',
      email: 'evaristeee@gmail.com',
      password: 'Password@123',
    });
    expect(res).to.have.status(400);
  });
});
it('should return an error if any required fields are missing', async () => {
  const res = await chai.request(app).post('/users').send({
    firstName: '',
    lastName: '',
    userName: '',
    telephone: '',
    address: '',
    email: '',
    password: '',
  });
  expect(res).to.have.status(404);
});
describe('email verification function', () => {
  let user;
  let token;
  before(async () => {
    await models.sequelize.sync({ force: true });
    user = await models.User.create({
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
      telephone: '555-5555',
      address: '123 Main St',
      email: 'kananura221023924@gmail.com',
      password: 'password',
      verified: false,
    });
    token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
  });
  after(async () => {
    await models.User.destroy({ where: {} });
  });
  it('should return an error if the user does not exist', async () => {
    const fakeUserId = '445223453';
    const fakeToken = jwt.sign({ userId: fakeUserId }, process.env.SECRET_KEY);
    const res = await chai
      .request(app)
      .get(`/user/verify_email/${fakeToken}`)
      .send();
    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('User not found.');
  });
  it('should return an error if the user is already verified', async () => {
    await models.User.update({ verified: true }, { where: { id: user.id } });
    const res = await chai
      .request(app)
      .get(`/user/verify_email/${token}`)
      .send();
    expect(res).to.have.status(400);
    expect(res.body.message).to.equal('Email already verified.');
  });

  it('should verify the user s email and return a success message', async () => {
    const user = await models.User.create({
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
      telephone: '555-5555',
      address: '123 Main St',
      email: 'kananura221023924@gmail.com',
      password: 'password',
      verified: false,
    });
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
    const res = await chai
      .request(app)
      .get(`/user/verify_email/${token}`)
      .send();
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Email verified successfully.');
    const updatedUser = await models.User.findOne({ where: { id: user.id } });
    expect(updatedUser.verified).to.be.true;
  });
  it('should return an error if the token is invalid', async () => {
    const user = await models.User.create({
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
      telephone: '555-5555',
      address: '123 Main St',
      email: 'kananura221023924@gmail.com',
      password: 'password',
      verified: false,
    });
    const secretKey = 'different_secret_key';
    const fakeToken = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: '1s',
    });
    const res = await chai
      .request(app)
      .get(`/user/verify_email/${fakeToken}`)
      .send();
    expect(res).to.have.status(400);
    expect(res.body.message).to.equal('Invalid token.');
  });
});

describe('User Login', () => {
  before(async () => {
    await models.sequelize.sync();
    await models.User.create({
      firstName: 'Didas',
      lastName: 'Junior',
      userName: 'Junior',
      telephone: '0790994799',
      address: 'Kigali',
      email: 'd.gasana@alustudent.com',
      password: await bcrypt.hash('Password@123', 10),
    });
  });

  after(async () => {
    await models.User.destroy({ where: {} });
  });

  it('Should LOGIN a USER', (done) => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'd.gasana@alustudent.com',
        password: 'Password@123',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        }
      });
  });
  it("it Shouldn't LOGIN a USER who has wrong credentials", (done) => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'evarist@gmail.com',
        password: 'Password@123',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        }
      });
  });
  it("it Shouldn't LOGIN a USER who has wrong credentials", (done) => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'd.gasana@alustudent.com',
        password: 'Password@12345',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        }
      });
  });
});

describe('check OTP for USER with role VENDOR to LOGIN', () => {
  let user;
  let otp;

  before(async () => {
    await models.sequelize.sync({ force: true });
    user = await models.User.create({
      firstName: 'wilbrord',
      lastName: 'ibyimana',
      userName: 'wilb',
      role: 'vendor',
      telephone: '0790994799',
      address: 'Kigali',
      password: await bcrypt.hash('Password@123', 10),
      email: 'bwilbrord@gmail.com',
    });
  });

  after(async () => {
    await user.destroy({ where: {} });
  });

  it('should send OTPCODE', (done) => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'bwilbrord@gmail.com',
        password: 'Password@123',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          otp = res.body.otp.otp;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Enter OTP to be be verified');
          done();
        }
      });
  });
  it('should return a token if OTPCODE is valid', (done) => {
    chai.request(app)
      .post('/user/otp')
      .send({
        email: 'bwilbrord@gmail.com',
        otp,
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.message).to.equal('User Logged Successfully');
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        }
      });
  });

  it('should return an error message if OTPCODE is expired', async () => {
    await user.update({
      otpcodeexpiration: new Date(new Date().getTime() - 901000)
    });

    const { email } = user;
    const response = await chai.request(app)
      .post('/user/otp')
      .send({ email, otp });

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('OTPCODE is expired try again');
  });

  it('should return an error message if OTPCODE is invalid or expired', async () => {
    const { email } = user;
    const otpe = '6543';
    const response = await chai.request(app)
      .post('/user/otp')
      .send({ email, otpe });
    expect(response.status).to.equal(401);
    expect(['Invalid OTPCODE', 'OTPCODE is expired try again']).to.include(response.body.message);
  });
});

describe('User Login', () => {
  before(async () => {
    await models.sequelize.sync();
    await models.User.create({
      firstName: 'Didas',
      lastName: 'Junior',
      userName: 'Junior',
      telephone: '0790994799',
      address: 'Kigali',
      email: 'test@alustudent.com',
      password: await bcrypt.hash('Password@123', 10),
    });
  });

  after(async () => {
    await models.User.destroy({ where: {} });
    // await models.sequelize.close();
  });

  it('Should LOGIN a USER', (done) => {
    chai
      .request(app)
      .post('/user/login')
      .send({
        email: 'test@alustudent.com',
        password: 'Password@123',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        }
      });
  });
  it("it Shouldn't LOGIN a USER who has wrong credentials", (done) => {
    chai
      .request(app)
      .post('/user/login')
      .send({
        email: 'evarist@gmail.com',
        password: 'Password@123',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        }
      });
  });
  it("it Shouldn't LOGIN a USER who has wrong credentials", (done) => {
    chai
      .request(app)
      .post('/user/login')
      .send({
        email: 'test@alustudent.com',
        password: 'Password@12345',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        }
      });
  });
});

describe('forgotPassword function', () => {
  before(async () => {
    await models.sequelize.sync();
    await models.User.destroy({ where: {} });
    await models.User.create({
      firstName: 'Kaneza',
      lastName: 'Erica',
      userName: 'Eriallan',
      telephone: '0785188981',
      address: 'Kigali',
      email: 'eriman@example.com',
      password: await bcrypt.hash('Password@123', 10),
    });
  });

  it('should send a reset password email if user exists', async () => {
    const res = await chai
      .request(app)
      .post('/user/forgotPassword')
      .send({ email: 'eriman@example.com' });
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('email sent successfully');
  });

  it('should return an error if user does not exist', async () => {
    const res = await chai
      .request(app)
      .post('/user/forgotPassword')
      .send({ email: 'nonexistent@example.com' });
    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('User not found');
  });
});

describe('resetPassword function', () => {
  let token;

  before(async () => {
    await models.sequelize.sync();
    await models.User.destroy({ where: {} });
    const user = await models.User.create({
      firstName: 'Kaneza',
      lastName: 'Erica',
      userName: 'Eriallan',
      telephone: '0785188981',
      address: 'Kigali',
      email: 'eriman@example.com',
      password: await bcrypt.hash('Password@123', 10),
    });
    token = tokenGenerator({ email: user.email, id: user.id });
  });

  it('should return an error if the user does not exist', async () => {
    const token = tokenGenerator({
      email: 'nonexistent@example.com',
      id: '1234',
    });
    const res = await chai
      .request(app)
      .put(`/user/resetPassword/${token}`)
      .send({
        password: 'NewPassword@123',
        confirmPassword: 'NewPassword@123',
      });
    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('user not found');
  });

  it('should return an error if the password and confirm password do not match', async () => {
    const user = await models.User.findOne({
      where: { email: 'eriman@example.com' },
    });
    const token = tokenGenerator({ email: user.email, id: user.id });
    const res = await chai
      .request(app)
      .put(`/user/resetPassword/${token}`)
      .send({
        password: 'NewPassword@123',
        confirmPassword: 'InvalidPasswo12?',
      });
    expect(res.body.message).to.equal('password is not matched');
  });
  it("should reset the user's password with a valid token and new password", async () => {
    const user = await models.User.findOne({
      where: { email: 'eriman@example.com' },
    });
    const token = tokenGenerator({ email: user.email, id: user.id });
    const res = await chai
      .request(app)
      .put(`/user/resetPassword/${token}`)
      .send({
        password: 'NewPassword@123',
        confirmPassword: 'NewPassword@123',
      });
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('password updated successfully');
    after(async () => {
      await user.destroy({ where: {} });
    });
  });
});

describe('check OTP for USER with role VENDOR to LOGIN', () => {
  let user;
  let otp;

  before(async () => {
    await models.sequelize.sync({ force: true });
    user = await models.User.create({
      firstName: 'wilbrord',
      lastName: 'ibyimana',
      userName: 'wilb',
      role: 'vendor',
      telephone: '0790994799',
      address: 'Kigali',
      password: await bcrypt.hash('Password@123', 10),
      email: 'bwilbrord@gmail.com',
    });
  });

  after(async () => {
    await user.destroy({ where: {} });
  });

  it('should send OTPCODE', (done) => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'bwilbrord@gmail.com',
        password: 'Password@123',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          otp = res.body.otp.otp;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Enter OTP to be be verified');
          done();
        }
      });
  });
  it('should return a token if OTPCODE is valid', (done) => {
    chai.request(app)
      .post('/user/otp')
      .send({
        email: 'bwilbrord@gmail.com',
        otp,
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body.message).to.equal('User Logged Successfully');
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        }
      });
  });

  it('should return an error message if OTPCODE is expired', async () => {
    await user.update({
      otpcodeexpiration: new Date(new Date().getTime() - 901000)
    });

    const { email } = user;
    const response = await chai.request(app)
      .post('/user/otp')
      .send({ email, otp });

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('OTPCODE is expired try again');
  });

  it('should return an error message if OTPCODE is invalid or expired', async () => {
    const { email } = user;
    const otpe = '6543';
    const response = await chai.request(app)
      .post('/user/otp')
      .send({ email, otpe });
    expect(response.status).to.equal(401);
    expect(['Invalid OTPCODE', 'OTPCODE is expired try again']).to.include(response.body.message);
  });
});

describe('Password Update', () => {
  before(async () => {
    await models.sequelize.sync();
    await models.User.create({
      firstName: 'Didas',
      lastName: 'Junior',
      userName: 'Junior',
      telephone: '0790994799',
      address: 'Kigali',
      email: 'gasanajr08@gmail.com',
      password: await bcrypt.hash('Password@123', 10),
    });
  });

  after(async () => {
    await models.User.destroy({ where: {} });
  });

  it('Should update a  USER PASSWORD', (done) => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'gasanajr08@gmail.com',
        password: 'Password@123'
      })
      .end((err, resp) => {
        if (err) done(err);
        const { token } = resp.body;
        chai.request(app)
          .patch('/user/updatePassword')
          .set('auth-token', token)
          .send({
            email: 'gasanajr08@gmail.com',
            oldPass: 'Password@123',
            newPass: 'Junior@08'
          })
          .end((error, res) => {
            if (error) done(error);
            else {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('message');
              done();
            }
          });
      });
  });
  it("Shouldn't LOGIN a USER using OLD PASSWORD", (done) => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'gasanajr08@gmail.com',
        password: 'Password@123',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        }
      });
  });
  it('Should LOGIN a USER with UPDATED CREDENTIALS', (done) => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'gasanajr08@gmail.com',
        password: 'Junior@08',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('message');
          done();
        }
      });
  });
});
