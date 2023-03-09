module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
<<<<<<< HEAD
        userName: 'Didas',
=======
        id: uuidv4(),
        firstName: 'Emille',
        lastName: 'Shumbusho',
        userName: 'Emile-x',
        telephone: '0780908888',
        address: 'Kigali',
>>>>>>> f61402a (ft(signUp):sign up a user)
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
