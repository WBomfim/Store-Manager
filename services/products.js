const productsModel = require('../models/products');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (!products) {
    return { error: 'Products not found' };
  }
  return { data: products };
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    return { error: 'Product not found' };
  }
  return { data: product };
};

const addProduct = async (product) => {
  const insertId = await productsModel.addProduct(product);
  if (!insertId) return { error: 'Product not added' };
  return {
    data: {
      id: insertId,
      name: product,
  } };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
