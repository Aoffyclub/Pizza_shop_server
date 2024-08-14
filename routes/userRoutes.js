const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  deleteUser,
} = require("../controllers/userController");
const {
  updateUserInfo,
  getUserInfo,
} = require("../controllers/userInfoController");
const authenticate = require("../middleware/middleware");

router.post("/api/user", createUser);
router.post("/api/login", login);
router.post("/api/userInfo", authenticate, updateUserInfo);
router.delete("/api/user", authenticate, deleteUser);
router.get("/api/userInfo", authenticate, getUserInfo);

module.exports = router;
