module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Profiles',
    [
      {
        firstName: 'Didas Junior',
        lastName: 'Gasana',
        telephone: '0790994799',
        address: 'Kigali',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Emille',
        lastName: 'Shumbusho',
        telephone: '0780908888',
        address: 'Kigali',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Profiles', null, {}),
};
