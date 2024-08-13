const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Image = sequelize.define("image", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

module.exports = Image;
