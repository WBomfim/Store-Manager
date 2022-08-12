const productsModel = require('../models/products');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (!products) {
    return { error: 'No products found' };
  }
  return products;
};

module.exports = {
  getAllProducts,
};
