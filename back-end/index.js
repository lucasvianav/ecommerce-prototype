var express = require('express');
var app = express();

var cors = require('cors');
var db = require('./connection');
var products = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', products);

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));

db.on('error', err => {
    logError(err);
});

app.listen(3030, () => {
    console.log(`Example app listening at http://localhost:3030`)
})