/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Orders', 'deliveryInfo', {
        type: Sequelize.JSONB,
        allowNull: true,
      }),
    ])
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'deliveryInfo'),
    ]);
  },
};