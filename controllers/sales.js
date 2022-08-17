const salesService = require('../services/sales');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  if (sales.error) {
    return res.status(sales.code).json({ message: sales.error });
  }
  return res.status(sales.code).json(sales.data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale.error) {
    return res.status(sale.code).json({ message: sale.error });
  }
  return res.status(sale.code).json(sale.data);
};

const addSale = async (req, res) => {
  const newSale = await salesService.addSale(req.body);
  if (newSale.error) {
    return res.status(newSale.code).json({ message: newSale.error });
  }
  return res.status(newSale.code).json(newSale.data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deletedSale = await salesService.deleteSale(id);
  if (deletedSale.error) {
    return res.status(deletedSale.code).json({ message: deletedSale.error });
  }
  return res.status(deletedSale.code).json(deletedSale.data);
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  deleteSale,
};
