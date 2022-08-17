const salesModel = require('../models/sales');
const validateSaleInfos = require('../schemas/validateSaleInfos');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  if (!sales) return { code: 404, error: 'Sales not found' };
  return { code: 200, data: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale) return { code: 404, error: 'Sale not found' };
  return { code: 200, data: sale };
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

const updateSale = async (saleId, sales) => {
  const error = await validateSaleInfos(sales);
  if (error) return error;

  const sale = await salesModel.getSaleById(saleId);
  if (!sale) return { code: 404, error: 'Sale not found' };

  const deleteSaleInfo = await salesModel.deleteSaleInfo(saleId);
  if (!deleteSaleInfo) return { code: 501, error: 'Sale not updated' };

  const insertSaleInfo = sales.map(({ productId, quantity }) => (
    salesModel.addSaleInfo(saleId, productId, quantity)
  ));
  await Promise.all(insertSaleInfo);

  return {
    code: 200,
    data: {
      saleId,
      itemsUpdated: sales,
    },
  };
};

const deleteSale = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale) return { code: 404, error: 'Sale not found' };

  const deletedSale = await salesModel.deleteSale(id);
  if (!deletedSale) return { code: 501, error: 'Sale not deleted' };

  return { code: 204, data: {} };
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
};
