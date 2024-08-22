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
  getAllUsers
} = require("../controllers/userInfoController");
const authenticate = require("../middleware/middleware");
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *     responses:
 *       200:
 *         description: The user was successfully created.
 * 
 *       400:
 *         description: Bad request. Invalid input data.
 */

router.post("/api/user", createUser);

router.post("/api/login", login);
router.post("/api/userInfo", authenticate, updateUserInfo);
router.delete("/api/user", authenticate, deleteUser);
router.get("/api/userInfo", authenticate, getUserInfo);
router.get("/api/users", authenticate, getAllUsers);

module.exports = router;
