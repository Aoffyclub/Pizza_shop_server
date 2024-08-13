const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/middleware");
const { addProductToCart, getCartItems, removeProductFromCart } = require("../controllers/cartController");

router.post("/api/cart", authenticate, addProductToCart);
router.get("/api/cart", authenticate, getCartItems);
router.delete("/api/cart/", authenticate, removeProductFromCart);

module.exports = router;
