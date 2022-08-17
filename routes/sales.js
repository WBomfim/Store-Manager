const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/sales');

const router = express.Router();

router.get('/', rescue(salesController.getAllSales));

router.get('/:id', rescue(salesController.getSaleById));

router.post('/', rescue(salesController.addSale));

router.put('/:id', rescue(salesController.updateSale));

router.delete('/:id', rescue(salesController.deleteSale));

module.exports = router;
