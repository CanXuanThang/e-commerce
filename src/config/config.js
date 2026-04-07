import "dotenv/config";

export default {
  development: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
};
