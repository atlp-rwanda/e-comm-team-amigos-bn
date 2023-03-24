import { v4 as uuidv4 } from 'uuid';
module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Products',
      [
        {
          id: uuidv4(),
          userId: '1b4a230b-47a7-4c94-b176-a75e28160a11',
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
          userId: '1b4a230b-47a7-4c94-b176-a75e28160a11',
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
          userId: '8fc3bd83-f06d-4071-b63a-e698bacf1a05',
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
          userId: '8fc3bd83-f06d-4071-b63a-e698bacf1a05',
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
};
