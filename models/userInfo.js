const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const UserInfo = sequelize.define(
  "userinfo",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
      allowNull: false,
      primaryKey: true, // Set as primary key if it's the primary key for this model
    },
    firstName: {
      type: DataTypes.STRING(50),
      defaultValue: "",
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      defaultValue: "",
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(200),
      defaultValue: "",
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      defaultValue: "",
      allowNull: true,
    },
    birth: {
      type: DataTypes.STRING(50),
      defaultValue: "",
      allowNull: true,
    },
  },

);

module.exports = UserInfo;
