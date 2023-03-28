import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import app from '../app'
import models from '../database/models'
import jwt from 'jsonwebtoken'
import generateToken from '../helpers/generateToken'
chai.use(chaiHttp)
dotenv.config()
describe('POST /reviews/:productId/review', () => {
    let user, product

    beforeEach(async () => {
        user = await models.User.create({
            id: uuidv4(),
            firstName: 'Kaneza',
            lastName: 'Erica',
            userName: 'Eriallan',
            telephone: '0785188981',
            address: 'Kigali',
            email: 'eriman@example.com',
            password: await bcrypt.hash('Password@123', 10),
            role: 'normal',
        })
        product = await models.Product.create({
            id: uuidv4(),
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100,
            imageUrl: 'https://via.placeholder.com/150',
            categoryId: uuidv4(),
        })
    })

    afterEach(async () => {
        await models.Review.destroy({ where: {} })
        await models.User.destroy({ where: {} })
        await models.Product.destroy({ where: {} })
    })
    it('should return 201 if the review is created successfully', async () => {
        const token = generateToken({ userId: user.id }, { expiresIn: '1d' })
        const requestBody = {
            rate: 4,
            feedback: 'Great Product',
        }
        const response = await chai
            .request(app)
            .post(`/reviews/${product.id}/review`)
            .send(requestBody)
            .set('authorization', `Bearer ${token}`)
        expect(response.status).to.equal(201)
        expect(response.body.message).to.equal('Review Created Successfully')
        expect(response.body.Review.rate).to.equal(requestBody.rate)
        expect(response.body.Review.feedback).to.equal(requestBody.feedback)
        expect(response.body.Review.userId).to.equal(user.id)
        expect(response.body.Review.productId).to.equal(product.id)
    })

    it('Should return 400 if user has already rated that product', async () => {
        const token = generateToken({ userId: user.id }, { expiresIn: '1d' })
        await models.Review.create({
            userId: user.id,
            productId: product.id,
            rate: 4,
            feedback: 'Good Product',
        })
        const requestBody = {
            rate: 4,
            feedback: 'Great Product!',
        }
        const response = await chai
            .request(app)
            .post(`/reviews/${product.id}/review`)
            .send(requestBody)
            .set('authorization', `Bearer ${token}`)
        expect(response.status).to.equal(400)
        expect(response.body.message).to.equal(
            'You have already rated this product'
        )
    })

    it('should return 404 if product is not found', async () => {
        const token = generateToken({ userId: user.id }, { expiresIn: '1d' })
        const requestBody = {
            rate: 4,
            feedback: 'Great Product !',
        }
        const response = await chai
            .request(app)
            .post(`/reviews/${uuidv4()}/review`)
            .send(requestBody)
            .set('authorization', `Bearer ${token}`)
        expect(response.status).to.equal(404)
        expect(response.body.message).to.equal('Product not found')
    })
})
