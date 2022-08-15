const joi = require('joi');

const validateProductname = (product) => {
  if (!product) return { code: 400, error: '"name" is required' };
  const schema = joi.string().min(5).required();
  const { error } = schema.validate(product);
  if (error) return { code: 422, error: '"name" length must be at least 5 characters long' };
  return false;
};

module.exports = validateProductname;
