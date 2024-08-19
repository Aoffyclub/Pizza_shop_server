const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, deleteProduct } = require("../controllers/productController");
const authenticate = require("../middleware/middleware");

router.post("/api/product", authenticate, createProduct);
router.delete("/api/deleteproduct", authenticate, deleteProduct);
router.get("/api/product", getAllProducts);

module.exports = router;
