
const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin } = require("../controllers/adminController");

router.post("/api/admin/create", createAdmin);
router.post("/api/admin/login", loginAdmin);

module.exports = router;
