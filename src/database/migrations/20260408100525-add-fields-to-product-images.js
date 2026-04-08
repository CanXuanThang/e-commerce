"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ProductImage", "variantId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ProductVariant",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("ProductImage", "variantId");
  },
};
