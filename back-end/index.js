var express = require('express');
var app = express();

var products = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', products);

app.listen(3030, () => {
    console.log(`Example app listening at http://localhost:3030`)
})