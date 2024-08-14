const User = require("../models/user");
const UserInfo = require("../models/userInfo");
const Address = require("../models/address");
const CartItem = require("../models/cart");
const Products = require("../models/product")

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

module.exports = {
  User,
  UserInfo,
  Address,
  CartItem,
  Products,
};
