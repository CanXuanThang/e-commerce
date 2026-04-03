require("sequelize-auto-migrations").run({
  migrationsDir: "src/database/migrations",
  modelsDir: "src/models",
  database: {
    dialect: "mysql",
    host: "127.0.0.1",
    username: "root",
    password: "thang010601",
    database: "e-commerce",
  },
});
