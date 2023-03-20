module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    'RolePermission',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      permissionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Permissions',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {}
  );
  RolePermission.associate = (models) => {
    RolePermission.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'Role',
    });
    RolePermission.belongsTo(models.Permission, {
      foreignKey: 'permissionId',
      as: 'Permission',
    });
  };
  return RolePermission;
};
