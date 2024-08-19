const { UserInfo } = require("../models/associations");
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

    const [affectedRows] = await UserInfo.update(
      { image: profileImage },
      { where: { user_id: userId } }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile saved successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving profile", error: err.message });
  }
};

const creatProductImage = (req, res) => {
  const imageUrl = `/uploads/product/${req.file.filename}`;
  res.status(200).send({
    imageUrl: imageUrl,
    message: "Upload product image successfully!",
  });
  if (!req.file) {
    res
      .status(200)
      .json({ message: "Upload product image fail", error: err.message });
  }
};

module.exports = { createImage, creatProductImage };
