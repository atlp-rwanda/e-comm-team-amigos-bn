module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Notifications', 'firstName', {
      allowNull: false,
      type: Sequelize.STRING
    }).then(() => {
      return queryInterface.addColumn('Notifications', 'lastName', {
        allowNull: false,
        type: Sequelize.STRING
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Notifications', 'firstName')
      .then(() => {
        return queryInterface.removeColumn('Notifications', 'lastName');
      });
  }
};