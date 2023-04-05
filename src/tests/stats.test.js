import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import app from '../app';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();
import models from '../database/models';
chai.use(chaiHttp);

describe('GET /product/sales/stats', () => {
    let roles,
        customerUser1,
        merchantUser,
        orderProduct1,
        product1,
        product2,
        adminUser,
        order1,
        order2;

    before(async () => {
        await models.sequelize.sync({ force: true });

        adminUser = await models.User.create({
            id: uuidv4(),
            firstName: 'Junior',
            lastName: 'Gasana',
            userName: 'didas___jr',
            telephone: '078000000',
            address: 'Kigali',
            email: 'admin@admin.com',
            password: await bcrypt.hash('Password@123', 10),
            role: 'admin',
            status: 'active',
            verified: 'true',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
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

        const customerRole = roles.find((role) => role.name === 'Customer');
        const merchantRole = roles.find((role) => role.name === 'Merchant');
        customerUser1 = await models.User.create({
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
        merchantUser = await models.User.create({
            id: uuidv4(),
            firstName: 'Didas',
            lastName: 'Junior',
            userName: 'Junior',
            telephone: '0790994799',
            address: 'Kigali',
            email: 'x@example.com',
            verified: true,
            active: true,
            password: await bcrypt.hash('Password@123', 10),
        });
        // UserRoles
        await models.UserRole.create({
            // Merchant
            id: uuidv4(),
            userId: customerUser1.id,
            roleId: customerRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // UserRoles
        await models.UserRole.create({
            // Customer
            id: uuidv4(),
            userId: merchantUser.id,
            roleId: merchantRole.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        product1 = await models.Product.create({
            id: uuidv4(),
            userId: merchantUser.id,
            name: 'testProduct',
            price: 40,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });
        product2 = await models.Product.create({
            id: uuidv4(),
            userId: merchantUser.id,
            name: 'testProduct 2',
            price: 40,
            quantity: 1,
            available: true,
            category: 'food',
            bonus: 20,
            images: ['image1', 'image2'],
            expiryDate: '2023-12-31T00:00:00.000Z',
            ec: 30,
        });
        order1 = await models.Order.create({
            id: uuidv4(),
            userId: customerUser1.id,
        });
        orderProduct1 = await models.OrderProduct.create({
            id: uuidv4(),
            orderId: order1.id,
            productId: product1.id,
            quantity: 1,
            unitPrice: 40,
        });
    });
    after(async () => {
        await models.User.destroy({ where: {} });
        await models.Product.destroy({ where: {} });
        await models.Product.destroy({ where: {} });
        await models.Order.destroy({ where: {} });
    });

    it('should return statistics for certain seller', async () => {
        const token = jwt.sign(
            { userId: merchantUser.id, userEmail: merchantUser.email },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            }
        );
        const startDate = '2022-01-01';
        const endDate = '2024-01-31';
        const res = await chai
            .request(app)
            .get(
                `/product/sales/stats?startDate=${startDate}&endDate=${endDate}`
            )
            .set('Authorization', 'Bearer ' + token);
    });
});
