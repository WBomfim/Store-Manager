const connection = require('./connection');

const getAllSales = async () => {
  const query = (
    `SELECT sl.id AS saleId, sl.date,
    sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS sl
    JOIN StoreManager.sales_products AS sp
    ON sl.id = sp.sale_id;`
  );
  const [sales] = await connection.execute(query);
  if (!sales) return null;
  return sales;
};

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
  getAllSales,
  addSale,
  addSaleInfo,
};
