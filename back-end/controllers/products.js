var express = require('express');
var connection = require('../connection');

var productsModel = require('../models/products');

async function generateProductId(data) {
  var retorno = 'oi';
  if (data.type === "EV"){
    await productsModel.find({type: "EV"}, async (err, products) => {
      if (products.length > 0){
        var ant = products[products.length-1];
        var nAnt = await ant._id.substr(1, ant.length);
        retorno =  "E" + (parseInt(nAnt) + 1);

      }else 
        retorno = "E1";
    })
  }else{
    await productsModel.find({type: "PR"}, async (err, products) => {
      if (products.length > 0){
        var ant = products[products.length-1];
        var nAnt = await ant._id.substr(1, ant.length);
        retorno =  "P" + (parseInt(nAnt) + 1);
      }else
        retorno = "P1";
    })
  }
  return retorno;
}

module.exports = {
  getAll: function(req, res, next) {
    productsModel.find({}, (err, products) => {
      if (err) {
        res.status(500);
        res.send(err);
      }else{
        res.status(200);
        res.send(products);
      }
    });
  },

  getOne: function(req, res, next) {
    productsModel.find({_id: req.params.id}, (err, product) => {
      if (err) {
        res.status(500);
        res.send(err);
      }else{
        res.status(200);
        res.send(product);
      }
    });
  },

  insert: async function(req, res, next) {
    req.body._id = await generateProductId(req.body);
    productsModel.insertMany([req.body], (err, response) => {
      if (err) {
        res.status(500);
        res.send(err);
      }else{
        res.status(200);
        res.send(response);
      }
    });
  },

  update: function(req, res, next) {
    productsModel.updateMany({ _id: req.params.id }, req.body,
      (err, response) => {
        if (err) {
            res.status(500);
          res.send(err);
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
            res.status(500);
          res.send(err);
        }else{
          res.status(200);
          res.send(response);
        }
    });
  }
}