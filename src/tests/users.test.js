import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../database/models'
import app from '../app'
chai.use(chaiHttp)

let userId
let token
describe('Create User', () => {
    before(async () => {
        await User.sync({ force: true })
        await User.create({
            firstName: 'Kaneza',
            lastName: 'Erica',
            userName: 'Eriallan',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'eriman@example.com',
            verified: true,
            active: true,
            password: await bcrypt.hash('Password@123', 10),
            role: 'admin',
        })
    })
    after(async () => {
        await User.destroy({ where: {} })
    })

    it('Should LOGIN a USER', (done) => {
        chai.request(app)
            .post('/user/login')
            .send({
                email: 'eriman@example.com',
                password: 'Password@123',
            })
            .end((err, res) => {
                if (err) done(err)
                else {
                    token = res.body.token
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('message')
                    done()
                }
            })
    })

    it('should create a new user', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johndoe',
            telephone: '0780348278',
            address: '123 Main Street',
            role: 'normal',
            email: 'johndoe@example.com',
            password: 'Password@123',
        }
        const res = await chai
            .request(app)
            .post('/users/create')
            .set('Authorization', `Bearer ${token}`)
            .send(userData)
        userId = res.body.data.id
        expect(res).to.have.status(201)
        expect(res.body)
            .to.have.property('message')
            .equal('Account created successfully')
        expect(res.body).to.have.property('data')
        expect(res.body).to.have.property('token')
    })

    it('should return an error if required fields are missing', async () => {
        const userData = {
            lastName: 'Doe',
            userName: 'johndoe',
            telephone: '1234567890',
            address: '123 Main Street',
            role: 'normal',
            gender: 'male',
            preferredLanguage: 'en',
            email: 'johndoe@example.com',
            password: 'Password@123',
        }
        const res = await chai
            .request(app)
            .post('/users/create')
            .send(userData)
            .set('Authorization', `Bearer ${token}`)
        expect(res).to.have.status(400)
    })
    it('should return an error if email is already in use', async () => {
        const res = await chai.request(app).post('/users/create').send({
            firstName: 'Manzi',
            lastName: 'Evariste',
            userName: 'Manzi212',
            telephone: '0785188981',
            address: 'Kiyovu',
            email: 'johndoe@example.com',
            password: 'Password@123',
        })
        expect(res).to.have.status(400)
    })

    it('should return an error if any required fields are missing', async () => {
        const res = await chai.request(app).post('/users').send({
            firstName: '',
            lastName: '',
            userName: '',
            telephone: '',
            address: '',
            email: '',
            password: '',
        })
        expect(res).to.have.status(404)
    })

    it('should return an error if any required fields are missing', async () => {
        const res = await chai.request(app).post('/users/create').send({
            firstName: 'Manzi',
            lastName: 'Evariste',
        })
        expect(res).to.have.status(400)
    })

    describe('GET user', () => {
        it('should return a user object if the user exists', (done) => {
            chai.request(app)
                .get(`/users/user/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.status).to.equal('success')
                    expect(res.body.user).to.be.an('object')
                    expect(res.body.user).to.not.have.property('password')
                    expect(res.body.user).to.not.have.property('otpcode')
                    expect(res.body.user).to.not.have.property(
                        'otpcodeexpiration'
                    )
                    done()
                })
        })

        it('should return a 404 error if the user does not exist', (done) => {
            chai.request(app)
                .get(`/users/user/${uuidv4()}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(404)
                    expect(res.body.status).to.equal('Not Found')
                    expect(res.body.error).to.equal('User does not exist')
                    done()
                })
        })
    })

    describe('update user by admin', () => {
        it('should update a user profile and return an updated user object', (done) => {
            chai.request(app)
                .put(`/users/${userId}`)
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
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.status).to.equal('OK')
                    expect(res.body.updatedUser).to.be.an('array').that.is.not
                        .empty
                    done()
                })
        })

        it('should return a 404 error if the user does not exist', (done) => {
            chai.request(app)
                .put(`/users/${uuidv4()}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    userName: 'johndoe',
                    address: '123 Main St',
                    telephone: '123-456-7890',
                    email: 'johndoe@example.com',
                    billingAddress: '456 Main St',
                    preferredLanguage: 'en',
                    birthdate: '1990-01-01',
                    preferredCurrency: 'USD',
                    gender: 'male',
                })
                .end((err, res) => {
                    expect(res).to.have.status(404)
                    expect(res.body.status).to.equal('Not Found')
                    expect(res.body.error).to.equal('User does not exist')
                    done()
                })
        })
    })

    describe('Delete  user by id done by admin', () => {
        it('should delete a user', (done) => {
            chai.request(app)
                .delete(`/users/delete/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.status).to.equal('OK')
                    expect(res.body.Message).to.equal(
                        'User successifully Deleted'
                    )
                    done()
                })
        })

        it('should return an error if user does not exist', (done) => {
            chai.request(app)
                .delete(`/users/delete/${uuidv4()}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    expect(res.body.status).to.equal('Not Found')
                    expect(res.body.error).to.equal('User does not exist')
                    done()
                })
        })
    })
})
