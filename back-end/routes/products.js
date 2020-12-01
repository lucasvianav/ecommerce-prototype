var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

var jsonParser = bodyParser.json();

router.get('/all/:page', function(req, res, next) {
  res.send('Rota get');
});

router.get('/:id', function(req, res, next) {
  res.send('Rota get');
});

router.post('/', jsonParser, function(req, res, next) {
  res.send('Rota post');
});

router.put('/:id', jsonParser, function(req, res, next) {
  res.send('Rota put');
});

router.delete('/:id', function(req, res, next) {
  res.send('Rota delete');
});

module.exports = router;