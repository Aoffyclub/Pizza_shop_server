const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Address = sequelize.define("address", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  zipCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Address;
