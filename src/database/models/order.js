module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },

            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },

            status: {
                type: DataTypes.ENUM(
                    'pending',
                    'processing',
                    'shipped',
                    'delivered'
                ),
                defaultValue: 'pending',
            },

            expected_delivery_date: {
                type: DataTypes.DATE,
            },
        },
        {}
    );

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'customer',
        });

        Order.hasMany(models.OrderProduct, {
            foreignKey: 'orderId',
            as: 'OrderProducts',
        });
    };

    return Order;
};
