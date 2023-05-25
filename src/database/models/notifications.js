module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
      'Notification',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        firstName: {
          allowNull:false,
          type: DataTypes.STRING
        },

        lastName: {
          allowNull:false,
          type: DataTypes.STRING
        },

        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        title: {
          allowNull:false,
          type: DataTypes.STRING
        },
        body: {
          allowNull:false,
          type: DataTypes.STRING
        },
      },
      {}
    );
  
    Notification.associate = (models) => {
      Notification.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    };
    return Notification;
  };
  