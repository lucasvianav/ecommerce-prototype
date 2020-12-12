var express = require('express');
var router = express.Router();

var cors = require('cors');

router.use(cors());

var productsController = require('../controllers/products');

router.get('/', (req, res, next) => {productsController.getAll(req, res, next)});

router.get('/:id', (req, res, next) => {productsController.getOne(req, res, next)});

router.get('/stock/:sku', (req, res) => {productsController.getStock(req, res)});

router.post('/', (req, res, next) => {productsController.insert(req, res, next)});

router.put('/:id', (req, res, next) => {productsController.update(req, res, next)});

router.delete('/:id', (req, res, next) => {productsController.del(req, res, next)});

module.exports = router;