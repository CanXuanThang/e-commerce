import "dotenv/config";

export default {
  development: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
