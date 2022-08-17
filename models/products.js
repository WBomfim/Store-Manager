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

const updateProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  await connection.execute(query, [name, id]);
  return true;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
  await connection.execute(query, [id]);
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
