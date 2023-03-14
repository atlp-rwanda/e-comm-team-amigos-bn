module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      otpcode: {
        type: DataTypes.STRING,
        allownull: true,
      },
      otpcodeexpiration: {
        type: DataTypes.DATE,
        allownull: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "vendor", "normal"),
      status: DataTypes.ENUM('active', 'inactive'),
      verified: DataTypes.BOOLEAN,
    },
    {}
  );

  User.associate = (models) => {
    User.hasMany(models.UserRole, {
      foreignKey: 'userId',
      as: 'UserRoles',
    });
  };
  return User;
};
