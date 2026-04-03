import { Sequelize } from "sequelize";

const sequelize = new Sequelize("e-commerce", "root", "thang010601", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
});

export default sequelize;
