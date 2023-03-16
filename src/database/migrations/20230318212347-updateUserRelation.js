/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'preferredCurrency', {
        type: Sequelize.STRING,
      }),

      queryInterface.addColumn('Users', 'gender', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'preferredCurrency'),
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.removeColumn('Users', 'deliveryInfo'),
      queryInterface.removeColumn('Users', 'paymentInfo'),
    ])
  },
}
