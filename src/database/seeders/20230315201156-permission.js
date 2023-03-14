import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Permissions',
    [
      {
        id: uuidv4(),
        name: 'manage roles',
        description: 'Assigning and removing roles to the user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'manage users',
        description: 'Activate and deactivating a user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'manage products',
        description: 'Add or remove a product from platform',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Permissions', null, {}),
};
