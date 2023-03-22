import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Products",
      [
        {
          id: uuidv4(),
          userId: 'ff55c63d-636c-4fbd-8f9e-312fec767af3',
          name: 'T-shirt',
          price: 5000,
          quantity: 4,
          available: true,
          category: 'Clothes',
          bonus: 120,
          images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg'
          ],
          expiryDate: new Date(),
          ec: 23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Products", null, {}),
};