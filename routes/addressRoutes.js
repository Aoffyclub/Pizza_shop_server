const express = require('express');
const router = express.Router();
const {createAddress, getUserAddress, deleteUserAddress} = require('../controllers/addressController');
const authenticate = require("../middleware/middleware");

router.post('/api/address', authenticate, createAddress);
router.get('/api/address', authenticate, getUserAddress);
router.delete('/api/address', authenticate, deleteUserAddress);

module.exports = router;
