import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: uuidv4(),
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
<<<<<<< HEAD
        id: uuidv4(),
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
=======
        userName: 'cyusa',
        email: 'cyusa.khevin100@gmail.com',
        password: '12345',
        role: 'admin',
        status: 'active',
        verified: 'true',
>>>>>>> 1d3e016 (feat(sign-in): add option to use google to authenticate users)
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
