const joi = require('joi');

const validateProductName = (product) => {
  const schema = joi.string().min(5).required().messages({
    'string.base': '400|"name" must be a string',
    'string.min': '422|"name" length must be at least {#limit} characters long',
    'any.required': '400|"name" is required',
  });
  const { error } = schema.validate(product);
  if (error) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), error: message };
  }
  return false;
};

module.exports = validateProductName;
