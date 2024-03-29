import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../database/models';
import { v4 as uuidv4 } from 'uuid';

chai.use(chaiHttp);

describe('Set user roles or permissions', () => {
    let user, roles;
    before(async () => {
        await models.sequelize.sync({ force: true });
        await models.Permission.destroy({ where: {} });
        await models.User.destroy({ where: {} });
        await models.UserRole.destroy({ where: {} });
        await models.Role.destroy({ where: {} });
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

        const res = await chai.request(app).post('/user/create').send({
            firstName: 'Role',
            lastName: 'EvarisCheckte',
            userName: 'rolecheck',
            telephone: '0785188981',
            address: 'Kiyovu',
            email: 'rolecheck@gmail.com',
            password: 'Password@123',
        });

        user = res.body;

        roles = JSON.parse(JSON.stringify(roles));
    });

    it('it should set a role', async () => {
        const { id } = roles.find((role) => role.name === 'Admin');

        const userRole = await chai.request(app).post('/role/set').send({
            userId: user.data.id,
            roleId: id,
        });

        expect(userRole).to.have.status(201);
    });

    it('Should return a user with a coresponding role', (done) => {
        chai.request(app)
            .get(`/user/role/${user.data.id}`)
            .send()
            .end((error, res) => {
                if (error) done(error);
                else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    });

    it("it shouldn't not set a role without valid userId and roleId", (done) => {
        chai.request(app)
            .post('/role/set')
            .send({
                userId: 'i32u9ejwq832',
                roleId: 'wqe09320',
            })
            .end((error, res) => {
                if (error) {
                    done(error);
                } else {
                    expect(res).to.have.status(404);
                    done();
                }
            });
    });

    it('Should return all users', async () => {
        const res = await chai.request(app).get('/users').send();
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Users');
    });

    it('Should create a role', async () => {
        await models.Role.destroy({ where: {} });
        const res = await chai.request(app).post('/role/create').send({
            name: 'Admin',
            description: 'Admin has access to every component of a system',
        });

        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Role');
        expect(res.body.response).to.have.property('id');
        expect(res.body.response.name).to.equal('Admin');
        expect(res.body.response.description).to.equal(
            'Admin has access to every component of a system'
        );
    });

    it('Should return all roles from database', async () => {
        const res = await chai.request(app).get('/roles').send();
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Roles');
    });

    it('Should create permission', async () => {
        const res = await chai.request(app).post('/permission/create').send({
            name: 'Manage store',
            description: 'Store is a space for managing product in the system',
        });
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Permission');
        expect(res.body.response).to.have.property('id');
        expect(res.body.response.name).to.equal('Manage store');
        expect(res.body.response.description).to.equal(
            'Store is a space for managing product in the system'
        );
    });

    it('Should return all permissions from database', async () => {
        const res = await chai.request(app).get('/permissions').send();
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Permissions');
        expect(res.body.count).to.equal(res.body.response.permissions.length);
    });

    it("it shouldn't set a permission without valid roleId and permissionId", (done) => {
        chai.request(app)
            .post('/permission/set')
            .send({
                roleId: 'eee1d041-a074-4f62',
                permissionId: '542f0bda-f0d7-469',
            })
            .end((error, res) => {
                if (error) done(error);
                else {
                    expect(res).to.have.status(404);
                    done();
                }
            });
    });

    it("it shouldn't update a permission with invalid id", (done) => {
        chai.request(app)
            .put('/permission/update/155a40ac-2e49-420b-a6c9-c554f8545f71')
            .send({
                name: 'manage store',
                description:
                    'user with manage store privillages has ability to manage store',
            })
            .end((error, res) => {
                if (error) done(error);
                else {
                    expect(res).to.have.status(404);
                    done();
                }
            });
    });

    it("it shouldn't delete a permission with invalid id", (done) => {
        chai.request(app)
            .delete('/permission/delete/155a40ac-2e49-420b-a6c9-c554f8545f20')
            .send()
            .end((error, res) => {
                if (error) done(error);
                else {
                    expect(res).to.have.status(404);
                    done();
                }
            });
    });

    it("it shouldn't update a role with invalid id", (done) => {
        chai.request(app)
            .put('/role/update/155a40ac-2e49-420b-a6c9-c554f8545f71')
            .send({
                name: 'admin',
                description:
                    'user with admin privillages has ability to manage system',
            })
            .end((error, res) => {
                if (error) done(error);
                else {
                    expect(res).to.have.status(404);
                    done();
                }
            });
    });

    it("it shouldn't delete a role with invalid id", (done) => {
        chai.request(app)
            .delete('/role/delete/155a40ac-2e49-420b-a6c9-c554f8545f20')
            .send()
            .end((error, res) => {
                if (error) done(error);
                else {
                    expect(res).to.have.status(404);
                    done();
                }
            });
    });
});
