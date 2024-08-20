const express = require('express')
const router = express.Router();
const authenticate = require('../middleware/middleware')
const  { createOrder} = require('../controllers/orderController')

router.post("/api/order", authenticate, createOrder);

module.exports = router;