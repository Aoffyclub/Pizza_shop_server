const { User, UserInfo } = require("../models/associations");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Create user info with the same user_id
    await UserInfo.create({
      user_id: newUser.user_id,
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({
      error: error.errors
        ? error.errors.map((err) => err.message)
        : error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ user_id: user.user_id }, "pizza", {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(401).json({ error: error.errors.map((err) => err.message) });
  }
};

const deleteUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, "pizza");
  const userId = decoded.user_id;
  try {
    await User.destroy({
      where: { user_id: userId },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(401).json({ error: error.errors.map((err) => err.message) });
  }
};

module.exports = { createUser, login, deleteUser };
