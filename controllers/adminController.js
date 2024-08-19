const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await Admin.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await Admin.create({
      username,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User admin created successfully" });
  } catch (error) {
    res.status(400).json({
      error: error.errors
        ? error.errors.map((err) => err.message)
        : error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({
      where: { username },
    });
    if (!user) return res.status(404).json({ error: "User admin not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ admin_id: user.admin_id }, "pizza", {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(401).json({ error: error.errors.map((err) => err.message) });
  }
};

module.exports = { createAdmin, loginAdmin };
