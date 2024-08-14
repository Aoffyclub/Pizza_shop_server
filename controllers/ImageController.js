// const Image = require("../models/image");
const UserInfo = require("../models/userInfo");
const jwt = require("jsonwebtoken");

const createImage = async (req, res) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  try {
    const decoded = jwt.verify(token, "pizza");
    const userId = decoded.user_id;

    let profileImage = null;

    if (req.file) {
      profileImage = `/uploads/${req.file.filename}`;
    }

    let user =  await UserInfo.findOne({
      where: { user_id: userId },
      
    });
    if (!user) {
      return res
       .status(404)
       .json({ message: "User not found" });
    }else {
      user.image = profileImage;
      await user.save();
    }

    res.status(200).json({ message: "Profile saved successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving profile", error: err.message });
  }
};

module.exports = { createImage };
