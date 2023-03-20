module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {}
  );

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User',
    });

    UserRole.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'Role',
    });
  };

  return UserRole;
};
