const connection = require('./connection');

const addSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(query);
  if (!insertId) return null;
  return insertId;
};

const addSaleInfo = async (saleId, productId, quantity) => {
  const query = (
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);'
  );
  await connection.execute(query, [saleId, productId, quantity]);
};

module.exports = {
  addSale,
  addSaleInfo,
};
