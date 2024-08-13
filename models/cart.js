const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CartItem = sequelize.define("cart", {
  user_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  item_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});



module.exports = CartItem;
