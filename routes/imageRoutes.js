const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticate = require("../middleware/middleware");
const { createImage } = require("../controllers/ImageController");




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/api/upload",
  authenticate,
  upload.single("profileImage"),
  createImage
);

module.exports = router;
