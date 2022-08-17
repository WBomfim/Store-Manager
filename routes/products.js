const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', rescue(productsController.getAllProducts));

router.get('/:id', rescue(productsController.getProductById));

router.post('/', rescue(productsController.addProduct));

router.put('/:id', rescue(productsController.updateProduct));

router.delete('/:id', rescue(productsController.deleteProduct));

module.exports = router;
