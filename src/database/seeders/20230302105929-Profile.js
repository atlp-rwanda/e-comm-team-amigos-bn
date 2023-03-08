import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Profiles',
    [
      {
        id:uuidv4(),
        firstName: 'Didas Junior',
        lastName: 'Gasana',
        telephone: '0790994799',
        address: 'Kigali',
        userId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:uuidv4(),
        firstName: 'Emille',
        lastName: 'Shumbusho',
        telephone: '0780908888',
        address: 'Kigali',
        userId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Profiles', null, {}),
};
