import { v4 as uuidv4 } from "uuid";
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: uuidv4(),
        userName: 'Didas',
        email: 'gasanajr08@gmail.com',
        password: '12345',
        role: 'admin',
        status: 'active',
        verified: 'true',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
