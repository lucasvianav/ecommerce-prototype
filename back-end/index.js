var express = require('express');
var app = express();

var cors = require('cors');
var db = require('./connection');

require('dotenv').config();

var products = require('./routes/products');
var accounts = require('./routes/account');
var auth = require('./routes/auth');

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({ extended: true }));

app.use('/products', products);
app.use('/api/accounts', accounts);
app.use('/api/auth', auth);

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(7001, () => console.log(`Example app listening at http://localhost:7001`))
})
