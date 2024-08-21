const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
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
  status : {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
  } 
 
});

module.exports = Order;
