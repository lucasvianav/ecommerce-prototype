var express = require('express');

var Products = require('../models/products');

async function generateProductId(data) {
  var retorno = '';
  if (data.type === "EV"){
    await Products.find({type: "EV"}, async (err, products) => {
      if (products.length > 0){
        var ant = products[products.length-1];
        var nAnt = await ant._id.substr(1, ant.length);
        retorno =  "E" + (parseInt(nAnt) + 1);

      }else 
        retorno = "E1";
    })
  }else{
    await Products.find({type: "PR"}, async (err, products) => {
      if (products.length > 0){
        var ant = products[products.length-1];
        var nAnt = await ant._id.substr(1, ant.length);
        retorno =  "P" + (parseInt(nAnt) + 1);
      }else
        retorno = "P1";
    })
  }
  console.log(retorno);
  return retorno;
}

module.exports = {
  getAll: function(req, res, next) {
    try{
      Products.find({}, (err, products) => {
        if (err) {
          res.status(500);
          res.send(err);
        }else{
          res.status(200);
          res.send(products);
        }
      });
    }catch(err){
      console.log(err);
    }
  },

  getOne: function(req, res, next) {
    try{
      Products.find({_id: req.params.id}, (err, product) => {
        if (err) {
          res.status(500);
          res.send(err);
        }else{
          res.status(200);
          res.send(product);
        }
      });
    }catch(err){
      console.log(err);
    }
  },

  insert: async function(req, res, next) {
    try{
      const {name, type, price, visibility, category, description, sizes, templates, colors, img: img_, stock: stock_} = req.body
      const img = img_.map(e => ({ alt: e.alt, path: e.file }) )
      const _id = await generateProductId(req.body)

      let stock = {}
      Object.keys(stock_).forEach(key => {
        stock[type + '-' + _id + key] = stock_[key]
      })

      var data = {_id, name, type, price, visibility, category, description, sizes, templates, colors, img, stock}

      Products.insertMany([data], (err, response) => {
        if (err) {
          res.status(500);
          res.send(err);
        }else{
          res.status(200);
          res.send(response[0]);
        }
      });
    }catch(err){
      console.log(err);
    }
  },

  update: async function(req, res, next) {
    try{
      const {name, type, price, visibility, category, description, sizes, templates, colors, img: img_, stock: stock_} = req.body
      const img = img_.map(e => ({ alt: e.alt, path: e.file }) )
      const _id = await generateProductId(req.body)

      let stock = {}
      Object.keys(stock_).forEach(key => {
        stock[type + '-' + _id + key] = stock_[key]
      })

      var data = {_id, name, type, price, visibility, category, description, sizes, templates, colors, img, stock}

      Products.updateMany({ _id: data._id }, data,
        (err, response) => {
          if (err) {
            res.status(500);
            res.send(err);
            console.log(err)
          }else{
            res.status(200);
            res.send(response);
          }
      });
    }catch(err){
      console.log(err);
    }
  },
  
  del: function(req, res, next) {
    try{
      Products.deleteMany({ _id: req.params.id },
        (err, response) => {
          if (err) {
              res.status(500);
            res.send(err);
          }else{
            res.status(200);
            res.send(response);
          }
      });
    }catch(err){
      console.log(err);
    }
  },

  getStock: async (req, res) => {
    const {sku} = req.params
    const [type, _id] = sku.split('-')
    const product = await Products.findById(_id)
    return res.json(parseInt(product.stock.get(sku)) || 0)
  }
}