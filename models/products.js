const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [rows] = await connection.execute(query);
  if (rows.length === 0) return null;
  return rows;
};

module.exports = {
  getAllProducts,
};
