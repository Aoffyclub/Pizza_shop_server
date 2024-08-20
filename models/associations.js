const User = require("../models/user");
const UserInfo = require("../models/userInfo");
const Address = require("../models/address");
const CartItem = require("../models/cart");
const Products = require("../models/product");
const Order = require("./order");
const OrderItem = require("./orderItem");

// Define associations
User.hasOne(UserInfo, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
UserInfo.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Address, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Address.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(CartItem, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
CartItem.belongsTo(User, {
  foreignKey: "user_id",
});

Products.hasMany(CartItem, {
  foreignKey: "product_id",
});

CartItem.belongsTo(Products, {
  foreignKey: "product_id",
});

User.hasMany(Order, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
});

Products.hasMany(Order, {
  foreignKey: "product_id",
});
Order.belongsTo(Products, {
  foreignKey: "product_id",
});

Address.hasMany(Order, {
  foreignKey: "address_id",
});
Order.belongsTo(Address, {
  foreignKey: "address_id",
});

Order.hasMany(OrderItem, {
  foreignKey: "order_id",
});
OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
});
Products.hasMany(OrderItem, {
  foreignKey: "product_id",
});
OrderItem.belongsTo(Products, {
  foreignKey: "product_id",
});
module.exports = {
  User,
  UserInfo,
  Address,
  CartItem,
  Products,
  Order,
  OrderItem,
};
