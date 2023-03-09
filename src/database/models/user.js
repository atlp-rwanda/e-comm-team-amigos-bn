module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    address: DataTypes.STRING,
    telephone: DataTypes.NUMBER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'vendor', 'normal'),
    status: DataTypes.ENUM('active', 'inactive'),
    verified: DataTypes.BOOLEAN
  }, {});
  return User;
};
