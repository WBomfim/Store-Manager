const productsModel = require('../models/products');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (!products) {
    return { error: 'No products found' };
  }
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product) {
    return { error: 'Product not found' };
  }
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
