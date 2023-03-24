'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            available: { type: DataTypes.BOOLEAN, defaultValue: false },
            category: DataTypes.STRING,
            bonus: DataTypes.INTEGER,
            images: DataTypes.ARRAY(DataTypes.STRING),
            expiryDate: DataTypes.DATE,
            ec: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
    )
    Product.associate = (models) => {
        Product.belongsTo(models.User, {
            foreignKey: 'userId',
        })
    }
    return Product
}
