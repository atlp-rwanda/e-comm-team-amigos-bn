/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all(
            await queryInterface.addColumn('Users', 'passwordResetTime', {
                allowNull: true,
                type: Sequelize.DATE,
            })
        );
    },

    async down(queryInterface, Sequelize) {
        return Promise.all(
            await queryInterface.removeColumn('Users', 'passwordResetTime')
        );
    },
};
