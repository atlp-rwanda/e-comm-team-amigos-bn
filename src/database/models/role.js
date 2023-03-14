module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );

  Role.associate = (models) => {
    Role.hasMany(models.UserRole, {
      foreignKey: 'roleId',
      as: 'UserRoles',
    });
    Role.hasMany(models.RolePermission, {
      foreignKey: 'roleId',
      as: 'RolePermissions',
    });
  };
  return Role;
};
