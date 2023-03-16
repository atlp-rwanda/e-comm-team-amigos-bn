/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            telephone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            birthdate: Sequelize.DATE,
            preferredCurrency: Sequelize.ENUM('Frw', 'USD'),
            gender: Sequelize.ENUM('Male', 'Female'),

            role: {
                type: Sequelize.ENUM(['admin', 'vendor', 'normal']),
                allowNull: false,
                defaultValue: 'normal',
            },
            status: {
                type: Sequelize.ENUM(['active', 'inactive']),
                allowNull: false,
                defaultValue: 'inactive',
            },
            preferredLanguage: Sequelize.STRING,
            billingAddress: Sequelize.STRING,
            verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            otpcode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            otpcodeexpiration: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Users')
    },
}
