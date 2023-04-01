import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Users',
            [
                {
                    id: uuidv4(),
                    firstName: 'Eric',
                    lastName: 'Ndungutse',
                    userName: 'eric_dnungutse',
                    telephone: '0785283007',
                    address: 'Muhanga',
                    email: 'dav.ndungutse@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    role: 'admin',
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    firstName: 'wilbrord',
                    lastName: 'ibyimana',
                    userName: 'wilb',
                    telephone: '0780908888',
                    billingAddress: 'Kigali',
                    address: 'Kigali',
                    email: 'bwilbrord@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    role: 'vendor',
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

                {
                    id: uuidv4(),
                    firstName: 'Jimmy',
                    lastName: 'Kubwimana',
                    userName: 'jkubwimana',
                    billingAddress: 'Kigali',
                    telephone: '0780909788',
                    address: 'Kigali',
                    email: 'jimmyd@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    role: 'vendor',
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    firstName: 'Normal',
                    lastName: 'User',
                    userName: 'normal_user',
                    telephone: '0789457437',
                    address: 'Kigali',
                    email: 'normal@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    role: 'normal',
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },



                

                {
                    id: uuidv4(),
                    firstName: 'Normal2',
                    lastName: 'User',
                    userName: 'normal_user',
                    telephone: '0789457437',
                    address: 'Kigali',
                    email: 'normal2@example.com',
                    password: await bcrypt.hash('Password@12345', 10),
                    role: 'normal',
                    status: 'active',
                    verified: 'true',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        ),
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Users', null, {}),
};
