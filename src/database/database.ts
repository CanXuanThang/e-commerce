import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.USERNAME_DB!,
  process.env.PASSWORD_DB!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
  },
);

export default sequelize;
