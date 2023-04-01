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

                    userId: '3fc975ce-3521-4e16-960c-763d2a41623c',
                    roleId: 'a1ab5eb5-1f4f-4666-8a32-ff00a8d3649c',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    // Merchant
                    id: uuidv4(),
                    userId: '0ac6d1e1-7c4b-468e-9ba2-aae705944274',
                    roleId: 'a1ab5eb5-1f4f-4666-8a32-ff00a8d3649c',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    // Merchant
                    id: uuidv4(),
                    userId: 'b314eebe-92e9-409d-b190-cc78cf85730c',
                    roleId: 'a1ab5eb5-1f4f-4666-8a32-ff00a8d3649c',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    // Customer
                    id: uuidv4(),
                    userId: 'b2e06e7f-3f51-4f33-9e74-ef7d04850f5e',
                    roleId: '462bd3ff-92a6-421c-b62c-e3bb08f84feb',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    // Admin
                    id: uuidv4(),
                    userId: '3c14472f-7be1-47b3-8598-6f2ca4f73880',
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
