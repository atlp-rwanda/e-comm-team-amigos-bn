module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            address: DataTypes.STRING,
            userName: DataTypes.STRING,
            telephone: DataTypes.STRING,
            billingAddress: DataTypes.STRING,
            fcmToken: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            otpcode: {
                type: DataTypes.STRING,
                allownull: true,
            },
            otpcodeexpiration: {
                type: DataTypes.DATE,
                allownull: true,
            },
            preferredCurrency: DataTypes.ENUM('Frw', 'USD'),

            preferredLanguage: DataTypes.STRING,
            email: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },
            birthdate: DataTypes.DATE,
            preferredCurrency: DataTypes.ENUM('Frw', 'USD'),
            gender: DataTypes.ENUM('Male', 'Female'),
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active',
            },
            verified: { type: DataTypes.BOOLEAN, defaultValue: 'false' },
        },
        {}
    );

    User.associate = (models) => {
        User.hasMany(models.UserRole, {
            foreignKey: 'userId',
            as: 'UserRoles',
        });

        User.hasMany(models.Product, {
            foreignKey: 'userId',
            as: 'user',
        });
        User.hasMany(models.Order, {
            foreignKey: 'userId',
            as: 'orders',
        });
    };

    return User;
};
