const productsService = require('../services/products');

const getAllProducts = async (_req, res) => {
  const { code, data, error } = await productsService.getAllProducts();
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { code, data, error } = await productsService.getProductById(id);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { code, data, error } = await productsService.searchProduct(q);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { code, data, error } = await productsService.addProduct(name);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { code, data, error } = await productsService.updateProduct(id, name);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { code, data, error } = await productsService.deleteProduct(id);
  if (error) {
    return res.status(code).json({ message: error });
  }
  return res.status(code).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
