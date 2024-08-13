const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const CartItem = require("../models/cart");

const Products = sequelize.define("product", {
  category_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  item_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

Products.hasMany(CartItem, {
  foreignKey: "item_id",
});

CartItem.belongsTo(Products, {
  foreignKey: "item_id",
});
module.exports = Products;
