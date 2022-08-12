const productsService = require('../services/products');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  if (products.error) {
    return res.status(404).json({ message: products.error });
  }
  return res.status(200).json(products);
};

module.exports = {
  getAllProducts,
};
