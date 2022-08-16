const salesService = require('../services/sales');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  if (sales.error) {
    return res.status(sales.code).json({ message: sales.error });
  }
  return res.status(sales.code).json(sales.data);
};

const addSale = async (req, res) => {
  const newSale = await salesService.addSale(req.body);
  if (newSale.error) {
    return res.status(newSale.code).json({ message: newSale.error });
  }
  return res.status(newSale.code).json(newSale.data);
};

module.exports = {
  getAllSales,
  addSale,
};
