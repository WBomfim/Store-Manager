const salesService = require('../services/sales');

const getAllSales = async (_req, res) => {
  const { code, data, error } = await salesService.getAllSales();
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { code, data, error } = await salesService.getSaleById(id);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const addSale = async (req, res) => {
  const { code, data, error } = await salesService.addSale(req.body);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { code, data, error } = await salesService.updateSale(id, req.body);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { code, data, error } = await salesService.deleteSale(id);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
};
