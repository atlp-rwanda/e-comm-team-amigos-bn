'use strict'
import { v4 as uuidv4 } from 'uuid'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert(
            'UserRoles',
            [
                {
                    // Merchant
                    id: uuidv4(),
                    userId: '20230302105921-User.js',
                    roleId: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    // Merchant
                    id: uuidv4(),
                    userId: '516e8361-ade3-4615-890f-8eb52d36a0ff',
                    roleId: 'a1ab5eb5-1f4f-4666-8a32-ff00a8d3649c',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    // Customer
                    id: uuidv4(),
                    userId: '9d460cd7-8f3b-493f-8a47-66fa112e7f36',
                    roleId: '462bd3ff-92a6-421c-b62c-e3bb08f84feb',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    // Admin
                    id: uuidv4(),
                    userId: 'e9b8ab7e-78fe-4dc8-80c0-2f7b16173c04',
                    roleId: 'ee44bc28-096b-42fc-b9fe-31299de56b00',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
}
