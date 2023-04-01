import { v4 as uuidv4 } from 'uuid'
module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Products',
            [
                {
                    id: uuidv4(),
                    userId: '3fc975ce-3521-4e16-960c-763d2a41623c',
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
                    userId: '3fc975ce-3521-4e16-960c-763d2a41623c',
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
                    userId: '0ac6d1e1-7c4b-468e-9ba2-aae705944274',
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
                    userId: '0ac6d1e1-7c4b-468e-9ba2-aae705944274',
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
