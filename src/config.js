require('dotenv').config()
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
    },
    test: {
        use_env_variable: 'TEST_DB',
        dialect: 'postgres',
        logging: false,
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        logging: false,
    },
    staging: {
        use_env_variable: 'RENDER_DB',
        dialect: 'postgres',
        logging: false,
    },
};
