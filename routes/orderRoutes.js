const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/middleware')
const  { createOrder, getOrders} = require('../controllers/orderController')

router.post("/api/order", authenticate, createOrder);
router.get("/api/order", authenticate, getOrders);

module.exports = router;