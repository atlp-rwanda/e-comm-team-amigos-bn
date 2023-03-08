module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    telephone: DataTypes.NUMBER,
    userId: DataTypes.UUID

  }, {});

  Profile.associate = function (models) {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'profile',
      onDelete: 'CASCADE'
    });
  };
  return Profile;
};
