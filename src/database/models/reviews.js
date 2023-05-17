'use strict'

module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
        'Review',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            userId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            productId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            rate: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            feedback: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {}
    )

    Review.associate = (models) => {
        Review.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Review.belongsTo(models.Product, {
            foreignKey: 'productId',
        })
    }

    return Review
}
