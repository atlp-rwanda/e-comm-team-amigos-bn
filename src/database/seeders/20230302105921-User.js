import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
module.exports = {
<<<<<<< HEAD
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          firstName: "Emille",
          lastName: "Shumbusho",
          userName: "Emile-x",
          telephone: "0780908888",
          address: "Kigali",
          email: "gasanajr08@gmail.com",
          password: await bcrypt.hash("Password@123", 10),
          role: "admin",
          status: "active",
          otpcode: "3295",
          otpcodeexpiration: new Date(),
          verified: "true",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          firstName: "wilbrord",
          lastName: "ibyimana",
          userName: "wilb",
          telephone: "0780908888",
          address: "Kigali",
          email: "bwilbrord@gmail.com",
          password: await bcrypt.hash("Wilbrord@213", 10),
          role: "vendor",
          status: "active",
          verified: "true",
          otpcode: "3245",
          otpcodeexpiration: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
=======
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: uuidv4(),
        firstName: 'Emille',
        lastName: 'Shumbusho',
        userName: 'Emile-x',
        telephone: '0780908888',
        address: 'Kigali',
        email: 'gasanajr08@gmail.com',
        password: '12345',
        role: 'admin',
        status: 'active',
        verified: 'true',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
<<<<<<< HEAD
>>>>>>> ch(user): add authorization
=======
>>>>>>> c7571d3889fc32488bff605098720d2d3e549411
