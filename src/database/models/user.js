module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'vendor', 'normal'),
    status: DataTypes.ENUM('active', 'inactive'),
    verified: DataTypes.BOOLEAN
  }, {});

  User.associate = function (models) {
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
