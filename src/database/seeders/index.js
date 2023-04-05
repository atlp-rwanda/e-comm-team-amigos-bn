import chaiHttp from 'chai-http';
import chai from 'chai';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import app from '../../app';
import models from '../models';
chai.use(chaiHttp);
module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await models.sequelize.sync({ force: true });
            const demoUsers = [
                // Admin User
                {
                    id: uuidv4(),
                    firstName: 'Admin',
                    lastName: 'Ndungutse',
                    userName: 'eric_dnungutse',
                    telephone: '0785283007',
                    address: 'Muhanga',
                    email: 'dav.ndungutse@gmail.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // Merchant
                {
                    id: uuidv4(),
                    firstName: 'Merchant',
                    lastName: 'One',
                    userName: 'merchant_one',
                    telephone: '0780908888',
                    address: 'Kigali',
                    email: 'merchant1@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    firstName: 'Merchant',
                    lastName: 'Two',
                    userName: 'merchant_two',
                    telephone: '0780909788',
                    address: 'Kigali',
                    email: 'merchant2@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    firstName: 'Merchant',
                    lastName: 'Three',
                    userName: 'merchant_three',
                    telephone: '0780909788',
                    address: 'Kigali',
                    email: 'merchant3@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // Customer Users
                {
                    id: uuidv4(),
                    firstName: 'Customer',
                    lastName: 'One',
                    userName: 'customer_one',
                    telephone: '0789457437',
                    address: 'Kigali',
                    email: 'customer1@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    firstName: 'Customer',
                    lastName: 'Two',
                    userName: 'customer_two',
                    telephone: '0789457437',
                    address: 'Kigali',
                    email: 'customer2@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    firstName: 'Customer',
                    lastName: 'Three',
                    userName: 'customer_three',
                    telephone: '0789457437',
                    address: 'Kigali',
                    email: 'customer3@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];
            // 1) Create Users
            let users = await models.User.bulkCreate(demoUsers);
            users = JSON.parse(JSON.stringify(users));
            // 2) Create Roles
            let roles = await models.Role.bulkCreate([
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
            // 3) Assign Roles
            let adminUsers = demoUsers.filter(
                (user) => user.firstName === 'Admin'
            );
            let merchantUsers = demoUsers.filter(
                (user) => user.firstName === 'Merchant'
            );
            let customerUsers = demoUsers.filter(
                (user) => user.firstName === 'Customer'
            );
            let adminRole = roles.find((role) => role.name === 'Admin');
            let merchantRole = roles.find((role) => role.name === 'Merchant');
            let customerRole = roles.find((role) => role.name === 'Customer');
            // Admin Role
            for (let i = 0; i < adminUsers.length; i++) {
                await models.UserRole.create({
                    id: uuidv4(),
                    userId: adminUsers[i].id,
                    roleId: adminRole.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            // Merchant Role
            for (let i = 0; i < merchantUsers.length; i++) {
                await models.UserRole.create({
                    id: uuidv4(),
                    userId: merchantUsers[i].id,
                    roleId: merchantRole.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            for (let i = 0; i < customerUsers.length; i++) {
                await models.UserRole.create({
                    id: uuidv4(),
                    userId: customerUsers[i].id,
                    roleId: customerRole.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            // 4 CREATE PRODUCTS
            let products = await models.Product.bulkCreate([
                {
                    id: uuidv4(),
                    userId: merchantUsers[0].id,
                    name: 'Safari',
                    price: 40000,
                    quantity: 5,
                    available: true,
                    category: 'Choes',
                    bonus: 0,
                    images: ['image1', 'image2'],
                    expiryDate: '2030-12-31T00:00:00.000Z',
                    ec: 30,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    userId: merchantUsers[0].id,
                    name: 'Shirts',
                    price: 12000,
                    quantity: 30,
                    available: true,
                    category: 'food',
                    bonus: 0,
                    images: ['image1', 'image2'],
                    expiryDate: '2030-12-31T00:00:00.000Z',
                    ec: 30,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    userId: merchantUsers[1].id,
                    name: 'Chairs',
                    price: 15000,
                    quantity: 30,
                    available: true,
                    category: 'Furniture',
                    bonus: 0,
                    images: ['image1', 'image2'],
                    expiryDate: '2023-12-31T00:00:00.000Z',
                    ec: 30,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    userId: merchantUsers[1].id,
                    name: 'Bench',
                    price: 5000,
                    quantity: 12,
                    available: true,
                    category: 'Furniture',
                    bonus: 20,
                    images: ['image1', 'image2'],
                    expiryDate: '2023-12-31T00:00:00.000Z',
                    ec: 30,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    userId: merchantUsers[2].id,
                    name: 'iPhone 6',
                    price: 70000,
                    quantity: 10,
                    available: true,
                    category: 'Electronic',
                    bonus: 0,
                    images: ['image1', 'image2'],
                    expiryDate: '2030-12-31T00:00:00.000Z',
                    ec: 30,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    userId: merchantUsers[2].id,
                    name: 'Dell Laptops',
                    price: 300000,
                    quantity: 5,
                    available: true,
                    category: 'Electronic',
                    bonus: 0,
                    images: ['image1', 'image2'],
                    expiryDate: '2030-12-31T00:00:00.000Z',
                    ec: 30,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
            products = JSON.parse(JSON.stringify(products));
            // 5) Create Orders with Customer Users
            for (let i = 0; i < customerUsers.length; i++) {
                let orderProductsNum = Math.round(
                    Math.random() * (products.length - 1 - 0) + 0
                );
                if (orderProductsNum === 0) orderProductsNum = 1;
                let orderProducts = [];
                for (let i = 0; i < orderProductsNum; i++) {
                    let productToOrder = Math.round(
                        Math.random() * (products.length - 1 - 0) + 0
                    );
                    if (
                        orderProducts.findIndex(
                            (prod) =>
                                prod.product === products[productToOrder].id
                        ) > -1
                    ) {
                        continue;
                    } else {
                        orderProducts.push({
                            product: products[productToOrder].id,
                            quantity: 1,
                            unitPrice: products[productToOrder].price,
                        });
                    }
                }
                let order = await models.Order.create({
                    userId: customerUsers[i].id,
                    expected_delivery_date:
                        Date.now() + 4 * 24 * 60 * 60 * 1000,
                });
                console.log(orderProducts);
                const promises = orderProducts.map(async (item) => {
                    let orderProduct = await models.OrderProduct.create({
                        orderId: order.id,
                        productId: item.product,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                    });
                    return orderProduct;
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Orders', null, {}),
};
