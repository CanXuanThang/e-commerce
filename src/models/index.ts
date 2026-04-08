import { CartItem } from "./CartItem";
import { Carts } from "./Carts";
import { Categories } from "./Categories";
import { OrderItem } from "./OrderItem";
import { Orders } from "./Orders";
import { Payments } from "./Payment";
import { ProductImage } from "./ProductImage";
import { Products } from "./Products";
import { ProductSize } from "./ProductSize";
import { ProductVariant } from "./ProductVariant";
import { Reviews } from "./Reviews";
import { Users } from "./Users";

// ==================== Users ====================
Users.hasOne(Carts, {
  foreignKey: "userId",
  as: "cart",
});

Users.hasMany(Orders, {
  foreignKey: "userId",
  as: "orders",
});

Users.hasMany(Reviews, {
  foreignKey: "userId",
  as: "reviews",
});

// ==================== Carts ====================
Carts.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

Carts.hasMany(CartItem, {
  foreignKey: "cartId",
  as: "items",
});

// ==================== CartItem ====================
CartItem.belongsTo(Carts, {
  foreignKey: "cartId",
  as: "cart",
});

CartItem.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

CartItem.belongsTo(ProductVariant, {
  foreignKey: "variantId",
  as: "variant",
});

CartItem.belongsTo(ProductSize, {
  foreignKey: "sizeId",
  as: "size",
});

// ==================== Categories ====================
Categories.hasMany(Products, {
  foreignKey: "categoryId",
  as: "products",
});

Categories.hasMany(Categories, {
  foreignKey: "parentId",
  as: "children",
});

Categories.belongsTo(Categories, {
  foreignKey: "parentId",
  as: "parent",
});

// ==================== Orders ====================
Orders.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

Orders.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
});

Orders.hasOne(Payments, {
  foreignKey: "orderId",
  as: "payment",
});

// ==================== OrderItem ====================
OrderItem.belongsTo(Orders, {
  foreignKey: "orderId",
  as: "order",
});

OrderItem.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

OrderItem.belongsTo(ProductVariant, {
  foreignKey: "variantId",
  as: "variant",
});

OrderItem.belongsTo(ProductSize, {
  foreignKey: "sizeId",
  as: "size",
});

// ==================== Payments ====================
Payments.belongsTo(Orders, {
  foreignKey: "orderId",
  as: "order",
});

// ==================== Products ====================
Products.belongsTo(Categories, {
  foreignKey: "categoryId",
  as: "category",
});

Products.hasMany(ProductVariant, {
  foreignKey: "productId",
  as: "variants",
  onDelete: "CASCADE",
  hooks: true,
});

Products.hasMany(CartItem, {
  foreignKey: "productId",
  as: "cartItems",
});

Products.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
});

Products.hasMany(Reviews, {
  foreignKey: "productId",
  as: "reviews",
});

// ==================== ProductVariant ====================
ProductVariant.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

ProductVariant.hasMany(ProductImage, {
  foreignKey: "variantId",
  as: "images",
  onDelete: "CASCADE",
  hooks: true,
});

ProductVariant.hasMany(ProductSize, {
  foreignKey: "variantId",
  as: "sizes",
  onDelete: "CASCADE",
  hooks: true,
});

// ==================== ProductImage ====================
ProductImage.belongsTo(ProductVariant, {
  foreignKey: "variantId",
  as: "variant",
});

// ==================== ProductSize ====================
ProductSize.belongsTo(ProductVariant, {
  foreignKey: "variantId",
  as: "variant",
});

// ==================== Reviews ====================
Reviews.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

Reviews.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});
