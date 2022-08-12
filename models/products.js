const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [rows] = await connection.execute(query);
  if (rows.length === 0 || !rows) return null;
  return rows;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [[rows]] = await connection.execute(query, [id]);
  if (!rows) return null;
  return rows;
};

module.exports = {
  getAllProducts,
  getProductById,
};
