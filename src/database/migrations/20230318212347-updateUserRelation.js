/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'billingAddress', // new field name
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn('Users', 'preferredLanguage', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Users', 'birthdate', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('Users', 'preferredCurrency', {
        type: Sequelize.ENUM('Frw', 'USD'),
      }),
      queryInterface.addColumn('Users', 'gender', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'billingAddress'),
      queryInterface.removeColumn('Users', 'preferredLanguage'),
      queryInterface.removeColumn('Users', 'birthdate'),
      queryInterface.removeColumn('Users', 'preferredCurrency'),
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.removeColumn('Users', 'deliveryInfo'),
      queryInterface.removeColumn('Users', 'paymentInfo'),
    ])
  },
};