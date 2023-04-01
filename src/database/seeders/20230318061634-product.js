import { v4 as uuidv4 } from 'uuid'
module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Products',
            [
                {
                    id: uuidv4(),
                    userId: '4e2e0539-5dd8-435a-bdd2-cd78854c08ce',
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
                },

                {
                    id: uuidv4(),
                    userId: '4e2e0539-5dd8-435a-bdd2-cd78854c08ce',
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
                },

                {
                    id: uuidv4(),
                    userId: '4e2e0539-5dd8-435a-bdd2-cd78854c08ce',
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
                },

                {
                    id: uuidv4(),
                    userId: '4e2e0539-5dd8-435a-bdd2-cd78854c08ce',
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
                },
            ],
            {}
        ),
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Products', null, {}),
}
