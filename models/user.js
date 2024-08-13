const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const UserInfo = require("../models/userInfo");
const Address = require("../models/address");
const CartItem = require("../models/cart");
const Image = require("../models/image")

const User = sequelize.define("user", {
  user_id: {
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
User.hasOne(UserInfo, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  allowNull: false,
});
UserInfo.belongsTo(User, {
  foreignKey: "user_id",
  allowNull: false,
});

User.hasMany(Address, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  allowNull: false,
});
Address.belongsTo(User, {
  foreignKey: "user_id",
  allowNull: false,
});

User.hasMany(CartItem, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  allowNull: false,
});
CartItem.belongsTo(User, {
  foreignKey: "user_id",
  allowNull: false,
});
User.hasMany(Image, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  allowNull: false,
})
Image.belongsTo(User, {
  foreignKey: "user_id",
  allowNull: false,
})

module.exports = User;
