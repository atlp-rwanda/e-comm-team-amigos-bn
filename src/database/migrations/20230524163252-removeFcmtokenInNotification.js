module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Notifications', 'fcmToken');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Notifications', 'fcmToken', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};