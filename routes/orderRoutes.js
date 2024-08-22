const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/middleware");
const {
  createOrder,
  getOrders,
  getOrderById,
  paymentOrder,
  cancelOrder,
  getAllOrder,
  reportData
} = require("../controllers/orderController");

router.post("/api/order", authenticate, createOrder);
router.get("/api/order", authenticate, getOrders);
router.get("/api/order/:id", authenticate, getOrderById);
router.post("/api/order/status", authenticate, paymentOrder);
router.post("/api/order/cancel", authenticate, cancelOrder);
router.get("/api/allorders", authenticate, getAllOrder);
router.get("/api/reportdata", authenticate, reportData);

module.exports = router;
