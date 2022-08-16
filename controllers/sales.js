const salesService = require('../services/sales');

const addSale = async (req, res) => {
  const newSale = await salesService.addSale(req.body);
  if (newSale.error) {
    return res.status(newSale.code).json({ message: newSale.error });
  }
  return res.status(newSale.code).json(newSale.data);
};

module.exports = {
  addSale,
};
