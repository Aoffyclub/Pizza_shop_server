const { User, UserInfo } = require("../models/associations");
const jwt = require("jsonwebtoken");

const updateUserInfo = async (req, res) => {
  const { firstName, lastName, image, email, birth } = req.body;

  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;

    const [affectedRows] = await UserInfo.update(
      { firstName, lastName, email, birth },
      { where: { user_id: userId } }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User info updated successfully",
    });
  } catch (error) {
    res.status(401).json({
      data: error,
      error: "Invalid token",
    });
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
    const userInfoDetail = await User.findOne({
      where: { user_id: userId },
      include: [
        {
          model: UserInfo,
          attributes: ["firstName", "lastName", "email", "birth", "image"],
        },
      ],
    });

    if (!userInfoDetail) {
      return res.status(404).json({ error: "User info not found" });
    }

    // Construct the response object
    const response = {
      username: userInfoDetail.username,
      firstName: userInfoDetail.userinfo.firstName,
      lastName: userInfoDetail.userinfo.lastName,
      image: userInfoDetail.userinfo.image,
      email: userInfoDetail.userinfo.email,
      birth: userInfoDetail.userinfo.birth,
    };

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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserInfo,
          attributes: ["firstName", "lastName", "email", "birth", "image"],
        },
      ],
    });
    if (users.length === 0) {
      return res.json({ data: [], message: "No users found" });
    } else {
      res.json({
        data: users.map((user) => ({
          username: user.username,
          user_id: user.user_id,
          firstName: user.userinfo.firstName,
          lastName: user.userinfo.lastName,
          image: user.userinfo.image,
          email: user.userinfo.email,
          birth: user.userinfo.birth,
        })),
        message: "Get all users success",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { updateUserInfo, getUserInfo, getAllUsers };
