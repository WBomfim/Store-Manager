const express = require('express');
const productsRoutes = require('./routes/products');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => response.send());

app.use('/products', productsRoutes);

module.exports = app;
