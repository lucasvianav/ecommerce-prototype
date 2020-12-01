var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var products = require('./routes/products');

app.use(bodyParser.json())
app.use('/products', products);

app.listen(3030, () => {
    console.log(`Example app listening at http://localhost:3030`)
})