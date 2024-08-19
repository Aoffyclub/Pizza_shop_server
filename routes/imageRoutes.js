const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticate = require("../middleware/middleware");
const { createImage, creatProductImage } = require("../controllers/ImageController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });

router.post(
  "/api/upload",
  authenticate,
  upload.single("profileImage"),
  createImage
);

router.post(
  "/api/upload/product",
  authenticate,
  upload2.single("productImage"),
  creatProductImage
);

module.exports = router;
