const productsService = require('../services/products');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  if (products.error) {
    return res.status(products.code).json({ message: products.error });
  }
  return res.status(products.code).json(products.data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (product.error) {
    return res.status(product.code).json({ message: product.error });
  }
  return res.status(product.code).json(product.data);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsService.addProduct(name);
  if (newProduct.error) {
    return res.status(newProduct.code).json({ message: newProduct.error });
  }
  return res.status(newProduct.code).json(newProduct.data);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
