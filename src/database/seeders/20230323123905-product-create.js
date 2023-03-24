'use strict';

import { v4 as uuidv4 } from "uuid";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      "Products", [
      {
        id: uuidv4(),
        userId: "40efdbd7-6d7d-4154-ba01-ba7f8c4fffb6",
        name: "phone",
        price: 100000,
        quantity: 10,
        available: true,
        category: "string",
        bonus: 0,
        images: [
          "https://picsum.photos/200",
          "https://picsum.photos/201",
          "https://picsum.photos/202",
          "https://picsum.photos/203"
        ],
        expiryDate: "2025-03-23",
        ec: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userId: "40efdbd7-6d7d-4154-ba01-ba7f8c4fffb6",
        name: "screen",
        price: 1000000,
        quantity: 15,
        available: true,
        category: "electronics",
        bonus: 3,
        images: [
          "https://picsum.photos/200",
          "https://picsum.photos/201",
          "https://picsum.photos/202",
          "https://picsum.photos/203"
        ],
        expiryDate: "2025-03-23",
        ec: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Products", null, {});
  }
};
