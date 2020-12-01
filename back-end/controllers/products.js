var express = require('express');

var productsModel = require('../models/products');

module.exports = {
  getAll: async function(req, res, next) {
    const result = await productsModel.getAll(req.params.page, res);
    res.send(result);
  },

  getOne: async function(req, res, next) {
    const result = await productsModel.getOne(req.params.id, res);
    res.send(result);
  },

  insert: async function(req, res, next) {
    const result = await productsModel.insert(req.body, res);
    res.send(result);
  },

  update: async function(req, res, next) {
    console.log(req.body);
    const result = await productsModel.update(req.params.id, req.body, res);
    res.send(result);
  },

  del: async function(req, res, next) {
    const result = await productsModel.del(req.params.id, res);
    res.send(result);
  }
}