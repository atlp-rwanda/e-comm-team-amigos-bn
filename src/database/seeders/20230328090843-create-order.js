import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Orders",
      [
        {
          id: uuidv4(),
          userId: 'f4b7e864-8ca2-4567-bc64-b7fb5921ec33',
          productId:'09b8acbc-7f1d-435b-a21a-634adeeb8bad',
          status: 'pending',
          expected_delivery_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          userId: 'f4b7e864-8ca2-4567-bc64-b7fb5921ec33',
          productId:'aa946365-367b-4fd6-adcb-52a5e4776432',
          status: 'shipped',
          expected_delivery_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Orders", null, {}),
};
