import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import models, { User } from '../database/models';
import app from '../app';
chai.use(chaiHttp);

let userId;
let token;
describe('Manage Users By Admin', () => {
    let roles, customerUser, adminUser, token;

    before(async () => {
        await models.sequelize.sync({ force: true });

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

        const adminRole = roles.find((role) => role.name === 'Admin');
        const customerRole = roles.find((role) => role.name === 'Customer');

        adminUser = await models.User.create({
            firstName: 'Didas',
            lastName: 'Junior',
            userName: 'Junior',
            telephone: '0790994799',
            address: 'Kigali',
            email: 'gasanajr@example.com',
            verified: true,
            active: true,
            password: await bcrypt.hash('Password@123', 10),
        });

        customerUser = await models.User.create({
            firstName: 'Didas',
            lastName: 'Junior',
            userName: 'Junior',
            telephone: '0790994799',
            address: 'Kigali',
            email: 'gasanajr08@example.com',
            verified: true,
            active: true,
            password: await bcrypt.hash('Password@123', 10),
        });

        // UserRoles
        await models.UserRole.create({
            // Merchant
            id: uuidv4(),
            userId: adminUser.id,
            roleId: adminRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // UserRoles
        await models.UserRole.create({
            // Customer
            id: uuidv4(),
            userId: customerUser.id,
            roleId: customerRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
    after(async () => {
        await User.destroy({ where: {} });
    });

    describe('GET user', () => {
        it('should return a user object if the user exists', async () => {
            const signin = await chai.request(app).post('/user/login').send({
                email: adminUser.email,
                password: 'Password@123',
            });

            let token = signin.body.token;
            const res = await chai
                .request(app)
                .get(`/users/user/${customerUser.id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res).to.have.status(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.user).to.be.an('object');
            expect(res.body.user).to.not.have.property('password');
            expect(res.body.user).to.not.have.property('otpcode');
            expect(res.body.user).to.not.have.property('otpcodeexpiration');
        });

        it('should return a 404 error if the user does not exist', async () => {
            const signin = await chai.request(app).post('/user/login').send({
                email: adminUser.email,
                password: 'Password@123',
            });

            let token = signin.body.token;

            const res = await chai
                .request(app)
                .get(`/users/user/${uuidv4()}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal('Not Found');
            expect(res.body.error).to.equal('User does not exist');
        }, 90000);
    });

    describe('update user by admin', () => {
        it('should update a user profile and return an updated user object', async () => {
            const signin = await chai.request(app).post('/user/login').send({
                email: adminUser.email,
                password: 'Password@123',
            });

            let token = signin.body.token;
            const res = await chai
                .request(app)
                .put(`/users/${customerUser.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstName: 'paulo',
                    lastName: 'Doe',
                    userName: 'johndoe',
                    address: '123 Main St',
                    telephone: '0784783622',
                    email: 'johndoe@example.com',
                    billingAddress: '456 Main St',
                    preferredLanguage: 'en',
                    birthdate: '1990-01-01',
                    preferredCurrency: 'USD',
                    gender: 'Male',
                });

            expect(res).to.have.status(200);
            expect(res.body.status).to.equal('OK');
            expect(res.body.updatedUser).to.be.an('array').that.is.not.empty;
        });

        it('should return a 404 error if the user does not exist', async () => {
            const signin = await chai.request(app).post('/user/login').send({
                email: adminUser.email,
                password: 'Password@123',
            });

            let token = signin.body.token;
            const res = await chai
                .request(app)
                .put(`/users/${uuidv4()}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstName: 'paulo',
                    lastName: 'Doe',
                    userName: 'johndoe',
                    address: '123 Main St',
                    telephone: '0784783622',
                    email: 'johndoe@example.com',
                    billingAddress: '456 Main St',
                    preferredLanguage: 'en',
                    birthdate: '1990-01-01',
                    preferredCurrency: 'USD',
                    gender: 'Male',
                });
            expect(res).to.have.status(404);
            expect(res.body.status).to.equal('Not Found');
            expect(res.body.error).to.equal('User does not exist');
        });
    });

    describe('Delete  user by id done by admin', () => {
        it('should delete a user', async () => {
            const signin = await chai.request(app).post('/user/login').send({
                email: adminUser.email,
                password: 'Password@123',
            });

            let token = signin.body.token;
            const res = await chai
                .request(app)
                .delete(`/users/delete/${customerUser.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('OK');
            expect(res.body.Message).to.equal('User successifully Deleted');
        });

        it('should return an error if user does not exist', async () => {
            it('should delete a user', async () => {
                const signin = await chai
                    .request(app)
                    .post('/user/login')
                    .send({
                        email: adminUser.email,
                        password: 'Password@123',
                    });

                let token = signin.body.token;
                const res = await chai
                    .request(app)
                    .delete(`/users/delete/${uuidv4()}`)
                    .set('Authorization', `Bearer ${token}`);

                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('OK');
                expect(res.body.Message).to.equal('User successifully Deleted');
            });
        });
    });
});
