const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define("admin", {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = Admin;
