import { CartItem } from "./CartItem";
import { Carts } from "./Carts";
import { Categories } from "./Categories";
import { OrderItem } from "./OrderItem";
import { Orders } from "./Orders";
import { Payments } from "./Payment";
import { ProductImage } from "./ProductImage";
import { Products } from "./Products";
import { Reviews } from "./Reviews";
import { Users } from "./Users";

console.log("✅ Associations loaded");

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

Carts.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

Carts.hasMany(CartItem, {
  foreignKey: "cartId",
  as: "items",
});

CartItem.belongsTo(Carts, {
  foreignKey: "cartId",
  as: "cart",
});

CartItem.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

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

OrderItem.belongsTo(Orders, {
  foreignKey: "orderId",
  as: "order",
});

OrderItem.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

Payments.belongsTo(Orders, {
  foreignKey: "orderId",
  as: "order",
});

Products.hasMany(CartItem, {
  foreignKey: "productId",
  as: "cartItems",
});

Products.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
});

Products.belongsTo(Categories, {
  foreignKey: "categoryId",
  as: "category",
});

Products.hasMany(ProductImage, {
  foreignKey: "productId",
  as: "images",
});

Products.hasMany(Reviews, {
  foreignKey: "productId",
  as: "reviews",
});

ProductImage.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

Reviews.belongsTo(Products, {
  foreignKey: "productId",
  as: "product",
});

Reviews.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});
