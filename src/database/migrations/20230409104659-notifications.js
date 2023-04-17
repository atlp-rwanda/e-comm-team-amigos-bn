module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications',{
      id:{
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      fcmToken: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Notifications')
  }
};
