const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [rows] = await connection.execute(query);
  if (!rows || rows.length === 0) return null;
  return rows;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [[rows]] = await connection.execute(query, [id]);
  if (!rows) return null;
  return rows;
};

const addProduct = async (product) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [{ insertId }] = await connection.execute(query, [product]);
  if (!insertId) return null;
  return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
