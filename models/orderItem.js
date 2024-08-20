const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order  = require("../models/order");
const Products = require("../models/product");

const OrderItem = sequelize.define("orderItem", {
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Order,
      key: "order_id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: "product_id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderItem;
