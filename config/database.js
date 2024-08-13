const  { Sequelize } =  require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.SQL_SCHEMA_NAME,
  process.env.SQL_NAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    port: process.env.SQL_HOST_PORT,
    dialect: "mysql",
  }
);

module.exports = sequelize