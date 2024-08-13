const  { DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/user")

const UserInfo = sequelize.define("userinfo", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  birth: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});


module.exports = UserInfo;
