"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    (await queryInterface.addColumn("CartItems", "variantId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ProductVariant",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }),
      await queryInterface.addColumn("CartItems", "sizeId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ProductSize",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }));
  },

  async down(queryInterface, Sequelize) {
    (await queryInterface.removeColumn("CartItems", "variantId"),
      await queryInterface.removeColumn("CartItems", "sizeId"));
  },
};
