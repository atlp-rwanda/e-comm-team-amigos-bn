import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import models from '../models';
chai.use(chaiHttp);

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Find Products
        let products = await models.Product.findAll({
            attributes: ['id'],
            raw: true,
        });
        products = products.map((prod) => prod.id);

        // Find Normal Users
        let normalUsers = await models.User.findAll({
            where: { role: 'normal' },
            attributes: ['email'],
            raw: true,
        });

        normalUsers = normalUsers.map((user) => user.email);

        for (let i = 0; i < normalUsers.length; i++) {
            let token;
            const signin = await chai.request(app).post('/user/login').send({
                email: normalUsers[i],
                password: 'Password@12345',
            });

            token = signin.body.token;

            let orderProductsNum = Math.round(
                Math.random() * (products.length - 1) + 1
            );

            const orderProducts = [];

            for (let i = 0; i < orderProductsNum; i++) {
                orderProducts.push({
                    product: products[i],
                    quantity: 30,
                    unitPrice: 200,
                });
            }

            await chai
                .request(app)
                .post('/orders')
                .send({
                    items: orderProducts,
                })
                .set('Authorization', 'Bearer ' + token);
        }
    },

    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Orders', null, {}),
};
