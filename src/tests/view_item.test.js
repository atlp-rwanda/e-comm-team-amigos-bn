import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import models from '../database/models'
import app from '../app'
import tokenGenerator from '../helpers/generateToken'

chai.use(chaiHttp)
let userOne, userTwo, userThree, userFour
let p1, p2, p3, p4

describe('View a Specific Product', () => {
    before(async () => {
        await models.sequelize.sync({ force: true })
        // Users
        userOne = await models.User.create({
            id: uuidv4(),
            firstName: 'Eric',
            lastName: 'Ndungutse',
            userName: 'eric_dnungutse',
            telephone: '0785283007',
            address: 'Muhanga',
            email: 'dav.ndungutse@gmail.com',
            password: await bcrypt.hash('Password@123', 10),
            role: 'admin',
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        userTwo = await models.User.create({
            id: uuidv4(),
            firstName: 'wilbrord',
            lastName: 'ibyimana',
            userName: 'wilb',
            telephone: '0780908888',
            billingAddress: 'Kigali',
            address: 'Kigali',
            email: 'wilbrord@gmail.com',
            password: await bcrypt.hash('Wilbrord@213', 10),
            role: 'vendor',
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        userThree = await models.User.create({
            id: uuidv4(),
            firstName: 'Jimmy',
            lastName: 'Kubwimana',
            userName: 'jkubwimana',
            billingAddress: 'Kigali',
            telephone: '0780909788',
            address: 'Kigali',
            email: 'jimmyd@gmail.com',
            password: await bcrypt.hash('Wilbrord@213', 10),
            role: 'vendor',
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        userFour = await models.User.create({
            id: uuidv4(),
            firstName: 'Normal',
            lastName: 'User',
            userName: 'normal_user',
            telephone: '0789457437',
            address: 'Kigali',
            email: 'normal@example.com',
            password: await bcrypt.hash('Normal@213', 10),
            role: 'normal',
            status: 'active',
            verified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        // Products
        p1 = await models.Product.create({
            id: uuidv4(),
            userId: userTwo.id,
            name: 'Product 1',
            price: 10,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        p2 = await models.Product.create({
            id: uuidv4(),
            userId: userTwo.id,
            name: 'Product 1.2',
            price: 0,
            quantity: 1,
            available: false,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        p3 = await models.Product.create({
            id: uuidv4(),
            userId: userThree.id,
            name: 'Product 2',
            price: 100,
            quantity: 2,
            available: true,
            category: 'Glocery',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        p4 = await models.Product.create({
            id: uuidv4(),
            userId: userThree.id,
            name: 'Product 2.1',
            price: 100,
            quantity: 0,
            available: false,
            category: 'Glocery',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    })

    after(async () => {
        await models.User.destroy({ where: {} })
        await models.Product.destroy({ where: {} })
    })

    it('Should get item without a user logged in', async () => {
        const res = await chai.request(app).get(`/product/${p1.dataValues.id}`)

        expect(res).to.have.status(200)
        expect(res.body.status).to.equal('success')
        expect(res.body.item.id).to.equal(p1.dataValues.id)
    })

    it('Should not get item if it is not available for sale', async () => {
        const res = await chai.request(app).get(`/product/${p2.dataValues.id}`)

        expect(res).to.have.status(404)
        expect(res.body.status).to.equal('fail')
        expect(res.body.message).to.equal('Product not available for sale.')
    })

    it('Should get error if id is invalid', async () => {
        const res = await chai.request(app).get(`/product/sdfj34re`)

        expect(res).to.have.status(400)
        expect(res.body.status).to.equal('fail')
        expect(res.body.message).to.equal(`Invalid id (sdfj34re)`)
    })

    it('Should get item if user is normal', async () => {
        let user, token

        const res = await chai.request(app).post('/user/login').send({
            email: 'normal@example.com',
            password: 'Normal@213',
        })
        user = res.body
        token = user.token

        const res2 = await chai
            .request(app)
            .get(`/product/${p1.dataValues.id}`)
            .set('Authorization', 'Bearer ' + token)

        expect(res2).to.have.status(200)
        expect(res2.body.status).to.equal('success')
        expect(res2.body.item.id).to.equal(p1.dataValues.id)
    })

    it('Should not get item if user is vendor and not the owner', async () => {
        let otp

        const res = await chai.request(app).post('/user/login').send({
            email: 'wilbrord@gmail.com',
            password: 'Wilbrord@213',
        })

        otp = res.body.otp.otp

        // Verify OTP
        const otpCheckRes = await chai.request(app).post('/user/otp').send({
            email: 'wilbrord@gmail.com',
            otp,
        })

        const { token } = otpCheckRes.body

        const itemRes = await chai
            .request(app)
            .get(`/product/${p3.dataValues.id}`)
            .set('Authorization', 'Bearer ' + token)

        expect(itemRes.body.message).to.equal(
            'You are not allowed to perform this operation'
        )
        expect(itemRes).to.have.status(403)
        expect(itemRes.body.status).to.equal('fail')
    })

    it('Should not get item if item not found', async () => {
        const res2 = await chai
            .request(app)
            .get(`/product/1b4a230b-47a7-4c94-b176-a75e28111111`)

        expect(res2).to.have.status(404)
        expect(res2.body.status).to.equal('fail')
        expect(res2.body.message).to.equal('Product not found.')
    })
})
