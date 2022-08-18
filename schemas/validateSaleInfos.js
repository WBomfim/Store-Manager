const joi = require('joi');
const productsModel = require('../models/products');

const validateProducts = async (sales) => {
  const products = sales.map(({ productId }) => productsModel.getProductById(productId));
  const productsById = await Promise.all(products);
  if (productsById.includes(null)) return { code: 404, error: 'Product not found' };
  return false;
};

const validateInfosRequest = (sales) => {
  const schema = joi.array().items(joi.object({
    productId: joi.number().required().messages({
      'number.base': '400|"productId" must be a number',
      'any.required': '400|"productId" is required',
    }),
    quantity: joi.number().min(1).required().messages({
      'number.base': '400|"quantity" must be a number',
      'number.min': '422|"quantity" must be greater than or equal to {#limit}',
      'any.required': '400|"quantity" is required',
    }),
  }));
  const { error } = schema.validate(sales);
  if (error) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), error: message };
  }
  return false;
};

const validateSaleInfos = async (sales) => {
  const dataRequestError = validateInfosRequest(sales);
  if (dataRequestError) return dataRequestError;
  const productErros = await validateProducts(sales);
  if (productErros) return productErros;
  return false;
};

module.exports = validateSaleInfos;
