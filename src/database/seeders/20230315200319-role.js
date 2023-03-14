import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Roles',
    [
      {
        id: uuidv4(),
        name: 'Admin',
        description: 'As an admin I should be able to monitor sytem grant and revoke other users permissions',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Merchant',
        description: 'As a merchant I should be to create, publish, and sell my product',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Customer',
        description: 'As a customer I should be able to vist all listed product and buy a products',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
};
