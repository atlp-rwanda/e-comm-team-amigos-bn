import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Products",
      [
        {
          id: uuidv4(),
          userId: '506f94a2-635b-4d86-8272-67d26a59c224',
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