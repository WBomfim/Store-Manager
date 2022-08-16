const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/sales');

const router = express.Router();

router.post('/', rescue(salesController.addSale));

module.exports = router;
