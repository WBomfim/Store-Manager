const productsService = require('../services/products');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  if (products.error) {
    return res.status(404).json({ message: products.error });
  }
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (product.error) {
    return res.status(404).json({ message: product.error });
  }
  return res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};
