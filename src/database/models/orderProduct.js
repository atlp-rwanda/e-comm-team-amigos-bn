module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define(
        'OrderProduct',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            orderId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Orders',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            quantity: DataTypes.INTEGER,
            unitPrice: DataTypes.INTEGER,
        },
        {}
    );

    OrderProduct.associate = (models) => {
        OrderProduct.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'Order',
        });

        OrderProduct.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'Product',
        });
    };

    return OrderProduct;
};
