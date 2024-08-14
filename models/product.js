const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Products = sequelize.define("product", {
  category_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

module.exports = Products;
