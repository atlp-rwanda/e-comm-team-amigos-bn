require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL_STAGING',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
  test: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    logging: false,
  },
  staging: {
    use_env_variable: "DATABASE_URL_STAGING",
    logging: false,
  },
};
