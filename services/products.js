const productsModel = require('../models/products');
const validateProductName = require('../schemas/validateProductName');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (!products) return { code: 404, error: 'Products not found' };
  return { code: 200, data: products };
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) return { code: 404, error: 'Product not found' };
  return { code: 200, data: product };
};

const searchProduct = async (name) => {
  if (!name) return getAllProducts();
  const products = await productsModel.searchProduct(name);
  if (!products) return { code: 200, data: [] };
  return { code: 200, data: products };
};

const addProduct = async (product) => {
  const error = validateProductName(product);
  if (error) return error;
  const insertId = await productsModel.addProduct(product);
  if (!insertId) return { code: 501, error: 'Product not added' };
  return { code: 201, data: { id: insertId, name: product },
  };
};

const updateProduct = async (id, product) => {
  const error = validateProductName(product);
  if (error) return error;
  const existsProduct = await productsModel.getProductById(id);
  if (!existsProduct) return { code: 404, error: 'Product not found' };
  await productsModel.updateProduct(id, product);
  return { code: 200, data: { id, name: product } };
};

const deleteProduct = async (id) => {
  const existsProduct = await productsModel.getProductById(id);
  if (!existsProduct) return { code: 404, error: 'Product not found' };
  await productsModel.deleteProduct(id);
  return { code: 204, data: {} };
};

module.exports = {
  getAllProducts,
  getProductById,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
