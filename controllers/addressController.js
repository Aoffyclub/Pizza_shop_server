const { Address } = require("../models/associations");
const jwt = require("jsonwebtoken");

const createAddress = async (req, res) => {
  const { address, city, province, zipCode, phoneNumber } = req.body;
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  const decoded = jwt.verify(token, "pizza");
  const userId = decoded.user_id;

  try {
    const user_address = await Address.create({
      user_id: userId,
      address,
      city,
      province,
      zipCode,
      phoneNumber,
    });

    res.json({
      data: user_address,
      message: "Create a new address successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const getUserAddress = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  const decoded = jwt.verify(token, "pizza");
  const userId = decoded.user_id;

  try {
    const user_addresses = await Address.findAll({
      where: { user_id: userId },
    });
    res.json({ data: user_addresses });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const deleteUserAddress = async (req, res) => {
  const { id } = req.body;
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  const decoded = jwt.verify(token, "pizza");
  const userId = decoded.user_id;

  console.log(req.body);

  try {
    const result = await Address.destroy({
      where: { id: id, user_id: userId },
    });
    if (result === 0) {
      return res.json({ message: "Address not found or not authorized" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

const updateAddress = async (req, res) => {
  const { id, address, city, province, zipCode, phoneNumber } = req.body;
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  const decoded = jwt.verify(token, "pizza");
  const userId = decoded.user_id;

  try {
    const user_address = await Address.update(
      { address, city, province, zipCode, phoneNumber },
      { where: { id: id, user_id: userId } }
    );
    res.json({
      data: user_address,
      message: "Updated user address successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message) });
  }
};

module.exports = {
  createAddress,
  getUserAddress,
  deleteUserAddress,
  updateAddress,
};
