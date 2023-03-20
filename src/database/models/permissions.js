module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    'Permission',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );
  Permission.associate = (models) => {
    Permission.hasMany(models.RolePermission, {
      foreignKey: 'permissionId',
      as: 'RolePermissions'
    });
  };
  return Permission;
};
