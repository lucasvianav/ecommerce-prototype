var express = require('express');
var router = express.Router();

var cors = require('cors');

router.use(cors());

var couponsController = require('../controllers/coupons');

router.get('/', (req, res, next) => {couponsController.getAll(req, res, next)});

router.get('/:id', (req, res, next) => {couponsController.getOne(req, res, next)});

router.post('/', (req, res, next) => {couponsController.insert(req, res, next)});

router.put('/:id', (req, res, next) => {couponsController.update(req, res, next)});

router.delete('/:id', (req, res, next) => {couponsController.del(req, res, next)});

module.exports = router;