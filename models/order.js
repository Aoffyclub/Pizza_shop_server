const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Products = require("./product");
const Address = require("./address");

const Order = sequelize.define("order", {
  order_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "user_id",
    },
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: "product_id",
    },
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Address,
      key: "id",
    },
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
 
});

module.exports = Order;
