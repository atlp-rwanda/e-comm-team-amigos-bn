import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import models from '../database/models';
import app from '../app';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
chai.use(chaiHttp);
const should = chai.should();

describe('Chat Feature', () => {
    before(async function () {
        await models.sequelize.sync({ force: true });
        await models.User.create({
            id: uuidv4(),
            firstName: 'Didas',
            lastName: 'Junior',
            userName: 'Junior',
            telephone: '0790994799',
            address: 'Kigali',
            email: 'jondoe@alustudent.com',
            password: await bcrypt.hash('Password@123', 10),
        });
    });

    after(async function () {
        await models.User.destroy({ where: {} });
    });

    it('Should Get All CHATS', async () => {
        const res = await chai.request(app).get('/chat');

        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('Chats');
    });
});
