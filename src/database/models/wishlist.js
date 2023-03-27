'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    'Wishlist',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
      },
      buyerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
    Wishlist.belongsTo(models.User, {
      foreignKey: 'buyerId',
      as: 'user',
    });
  };
  return Wishlist;
};