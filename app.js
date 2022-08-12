const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const productsRoutes = require('./routes/products');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => response.send());

app.use('/products', productsRoutes);

app.use(errorMiddleware);

module.exports = app;
