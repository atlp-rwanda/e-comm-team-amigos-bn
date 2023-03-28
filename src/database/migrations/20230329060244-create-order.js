/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },

            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },

            status: {
                type: Sequelize.ENUM(
                    'pending',
                    'processing',
                    'shipped',
                    'delivered'
                ),
                defaultValue: 'pending',
            },

            expected_delivery_date: {
                type: Sequelize.DATE,
                default: new Date(
                    new Date().getTime() + 5 * 24 * 60 * 60 * 1000
                ),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Orders');
    },
};