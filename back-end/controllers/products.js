var express = require('express');
var connection = require('../connection');

var productsModel = require('../models/products');

module.exports = {
  getAll: function(req, res, next) {
    productsModel.find({}, (err, products) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.send([]);
      }else{
        res.status(200);
        res.send(products);
      }
    });
  },

  getOne: function(req, res, next) {
    productsModel.find({id: req.params.id}, (err, product) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.send([]);
      }else{
        res.status(200);
        res.send(product);
      }
    });
  },

  insert: function(req, res, next) {
    productsModel.insertMany([req.body], (err, response) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.send([]);
      }else{
        res.status(200);
        res.send(response);
      }
    });
  },

  update: function(req, res, next) {
    productsModel.updateMany({ id: req.params.id }, req.body,
      (err, response) => {
        if (err) {
          console.log(err);
          res.status(500);
          res.send([]);
        }else{
          res.status(200);
          res.send(response);
        }
    });
  },

  
  del: function(req, res, next) {
    productsModel.deleteMany({ id: req.params.id },
      (err, response) => {
        if (err) {
          console.log(err);
          res.status(500);
          res.send([]);
        }else{
          res.status(200);
          res.send(response);
        }
    });
  }
}