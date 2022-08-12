const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', rescue(productsController.getAllProducts));

module.exports = router;
