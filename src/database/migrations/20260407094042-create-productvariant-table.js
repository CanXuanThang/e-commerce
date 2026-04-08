"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductVariant", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      colorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      colorCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      sku: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });

    await queryInterface.addConstraint("ProductVariant", {
      fields: ["productId", "colorName"],
      type: "unique",
      name: "unique_product_color",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductVariant");
  },
};
