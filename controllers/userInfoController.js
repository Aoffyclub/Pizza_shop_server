const UserInfo = require("../models/userInfo");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createUserInfo = async (req, res) => {
  const { firstName, lastName, image, email, birth } = req.body;

  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;

    const [userInfo, created] = await UserInfo.upsert({
      user_id: userId,
      firstName,
      lastName,
      image,
      email,
      birth,
    });

    res.status(200).json({
      data: userInfo,
      message: created
        ? "User info created successfully"
        : "User info updated successfully",
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const getUserInfo = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;

    // Fetch user info with associated user details
    const userInfo = await UserInfo.findOne({
      where: { user_id: userId },
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!userInfo) {
      return res.status(404).json({ error: "User info not found" });
    }

    // Construct the response object
    const response = {
      username: userInfo.user.username,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      image: userInfo.image,
      email: userInfo.email,
      birth: userInfo.birth,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
    };

    // const userAll = await UserInfo.destroy({
    //   where: { user_id: userId }
    // })

    // Send the response
    res.status(200).json({
      data: response,
      message: "Get user data success",
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createUserInfo, getUserInfo };
