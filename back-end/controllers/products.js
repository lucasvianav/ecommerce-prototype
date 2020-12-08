var express = require('express');

var productsModel = require('../models/products');

async function generateProductId(data) {
  var retorno = '';
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
  console.log(retorno);
  return retorno;
}

module.exports = {
  getAll: function(req, res, next) {
    try{
      productsModel.find({}, (err, products) => {
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
      productsModel.find({_id: req.params.id}, (err, product) => {
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
      var data = {};
      data._id = await generateProductId(req.body);
      data.name = req.body.name;
      data.type = req.body.type;
      data.price = req.body.price;
      data.visibility = req.body.visibility;
      data.category = req.body.category;
      data.description = req.body.description;
      data.sizes = req.body.sizes;
      data.templates = req.body.templates;
      data.colors = req.body.colors;
      data.img = req.body.img;

      data.stock = {};
      await req.body.stock.forEach((item, indice) => {
        //Formato do stock recebido: ["cor", "template", "size", qtd]
        var chave = req.body.type + "-" + data._id;
        chave += (item[0] === "" || item[0] === null) ? "-VOID" : "-" + item[0].toUpperCase().substr(0, 4);
        chave += (item[1] === "" || item[1] === null) ? "-VOID" : "-" + item[1].toUpperCase().substr(0, 4);
        chave += (item[2] === "" || item[2] === null) ? "-VOID" : "-" + item[2].toUpperCase().substr(0, 4);
        data.stock[chave] = item[3];
      });

      productsModel.insertMany([data], (err, response) => {
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
      var data = {};
      data._id = req.params.id;
      data.name = req.body.name;
      data.type = req.body.type;
      data.price = req.body.price;
      data.visibility = req.body.visibility;
      data.category = req.body.category;
      data.description = req.body.description;
      data.sizes = req.body.sizes;
      data.templates = req.body.templates;
      data.colors = req.body.colors;
      data.img = req.body.img;
   
      data.stock = {};
      await req.body.stock.forEach((item, indice) => {
        //Formato do stock recebido: ["cor", "template", "size", qtd]
        var chave = req.body.type + "-" + data._id;
        chave += (item[0] === "" || item[0] === null) ? "-VOID" : "-" + item[0].toUpperCase().substr(0, 4);
        chave += (item[1] === "" || item[1] === null) ? "-VOID" : "-" + item[1].toUpperCase().substr(0, 4);
        chave += (item[2] === "" || item[2] === null) ? "-VOID" : "-" + item[2].toUpperCase().substr(0, 4);
        data.stock[chave] = item[3];
      });

      productsModel.updateMany({ _id: data._id }, data,
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
      productsModel.deleteMany({ _id: req.params.id },
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
  }
}