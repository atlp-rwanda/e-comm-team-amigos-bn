'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Products', 'images', {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Products', 'images', {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
        });
    },
};
