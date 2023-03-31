const models = require("./../models");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const random = require("./../../helpers/generateRandomNumber");

const uuidv4 = v4;

const usersSeedData = async () => {
    return ([
        {
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
            verified: 'true',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: uuidv4(),
            firstName: 'James',
            lastName: 'Didier',
            userName: 'james05',
            telephone: '0780908888',
            billingAddress: 'Kigali',
            address: 'Kigali',
            email: 'james.didier@mail.com',
            password: await bcrypt.hash('Wilbrord@213', 10),
            role: 'vendor',
            status: 'active',
            verified: 'true',
            createdAt: new Date(),
            updatedAt: new Date(),
        },

        {
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
            verified: 'true',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
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
            verified: 'true',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]);
};

const ordersSeedData = async (users) => ([
    {
        userId: users[random(0, users.length - 1)].id,
        expected_delivery_date: Date.now() + 4 * 24 * 60 * 60 * 1000
    },
    {
        userId: users[random(0, users.length - 1)].id,
        expected_delivery_date: Date.now() + 4 * 24 * 60 * 60 * 1000
    }
]);
const orderProductSeedData = async (orders, products) => ([
    { orderId: orders[random(1, orders.length - 1)].id, productId: products[random(1, products.length - 1)].id, quantity: random(1, 20), unitPrice: 1000 },
    { orderId: orders[random(1, orders.length - 1)].id, productId: products[random(1, products.length - 1)].id, quantity: random(1, 20), unitPrice: 1500 },
    { orderId: orders[random(1, orders.length - 1)].id, productId: products[random(1, products.length - 1)].id, quantity: random(1, 20), unitPrice: 4500 },
    { orderId: orders[random(1, orders.length - 1)].id, productId: products[random(1, products.length - 1)].id, quantity: random(1, 20), unitPrice: 9000 },
    { orderId: orders[random(1, orders.length - 1)].id, productId: products[random(1, products.length - 1)].id, quantity: random(1, 20), unitPrice: 1800 },
    { orderId: orders[random(1, orders.length - 1)].id, productId: products[random(1, products.length - 1)].id, quantity: random(1, 20), unitPrice: 36000 },
    { orderId: orders[random(1, orders.length - 1)].id, productId: products[random(1, products.length - 1)].id, quantity: random(1, 20), unitPrice: 72000 },
    { orderId: orders[random(1, orders.length - 1)].id, productId: products[random(1, products.length - 1)].id, quantity: random(1, 20), unitPrice: 144000 },
]);
const productsSeedData = async (users) => {
    return ([
        {
            id: uuidv4(),
            userId: users[random(0, users.length - 1)].id,
            name: 'T-shirt',
            price: 5000,
            quantity: 4,
            available: true,
            category: 'Clothes',
            bonus: 120,
            images: [
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg',
                'https://example.com/image3.jpg'
            ],
            expiryDate: new Date(),
            ec: 23,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
};

async function isDatabaseEmpty() {
    const users = await models.User.findAll();
    const orders = await models.Order.findAll();
    const products = await models.Product.findAll();
    const orderProducts = await models.OrderProduct.findAll();

    return { users, orders, products, orderProducts };
}

async function seedDatabase(tables) {
    // console.log(tables);

    if (tables.users.length == 0)
        await models.User.bulkCreate(await usersSeedData());
    else console.log(`Table Users has data. Skipping it..`);


    if (tables.products.length == 0) {
        const userRaw = async () => await models.User.findAll({ where: { role: "vendor" } });
        const user = await userRaw().then(res => res.map(item => item.toJSON()));
        if (!user) return;
        await models.Product.bulkCreate(await productsSeedData(user));
    }
    else console.log(`Table Products has data. Skipping it..`);

    if (tables.orders.length == 0) {
        const usersRaw = async () => await models.User.findAll({ where: { role: "normal" } });
        const users = await usersRaw().then(res => res.map(item => item.toJSON()));
        await models.Order.bulkCreate(await ordersSeedData(users));
    }
    else console.log(`Table Orders has data. Skipping it..`);


    if (tables.orderProducts.length == 0) {
        const ordersRaw = async () => await models.Order.findAll({});
        const orders = await ordersRaw().then(res => res.map(item => item.toJSON()));

        const productsRaw = async () => await models.Product.findAll({});
        const products = await productsRaw().then(res => res.map(item => item.toJSON()));

        await models.OrderProduct.bulkCreate(await orderProductSeedData(orders, products));
    }
    else console.log(`Table OrderProducts has data. Skipping it..`);

    console.log('Database seeded successfully');

}


isDatabaseEmpty().then((tables) => {
    if (tables) {
        seedDatabase(tables);
    } else {
        console.log('Database already has data, skipping seeding');
    }
}).catch((err) => {
    console.error('Error checking if database is empty:', err);
});