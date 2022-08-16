const salesModel = require('../models/sales');
const validateSaleInfos = require('../schemas/validateSaleInfos');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  if (!sales) return { code: 404, error: 'Sales not found' };
  return { code: 200, data: sales };
};

const addSale = async (sales) => {
  const error = await validateSaleInfos(sales);
  if (error) return error;

  const saleId = await salesModel.addSale();
  if (!saleId) return { code: 501, error: 'Sale not added' };

  const insertSaleInfo = sales.map(({ productId, quantity }) => (
    salesModel.addSaleInfo(saleId, productId, quantity)
  ));
  await Promise.all(insertSaleInfo);

  return {
    code: 201,
    data: {
      id: saleId,
      itemsSold: sales,
    },
  };
};

module.exports = {
  getAllSales,
  addSale,
};
