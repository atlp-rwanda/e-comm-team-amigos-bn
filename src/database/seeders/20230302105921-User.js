import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Emille',
        lastName: 'Shumbusho',
        userName: 'Emile-x',
        telephone: '0780908888',
        address: 'Kigali',
        email: 'gasanajr08@gmail.com',
        password: '12345',
        role: 'admin',
        status: 'active',
        otpcode: '3295',
        otpcodeexpiration: new Date(),
        verified: 'true',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'wilbrord',
        lastName: 'ibyimana',
        userName: 'wilb',
        telephone: '0780908888',
        address: 'Kigali',
        email: 'bwilbrord@gmail.com',
        password: 'Wilbrord@213',
        role: 'vendor',
        status: 'active',
        verified: 'true',
        otpcode: '3245',
        otpcodeexpiration: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
