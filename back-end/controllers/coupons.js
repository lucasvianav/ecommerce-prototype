var express = require('express');

var couponsModel = require('../models/coupons');

module.exports = {
  getAll: function(req, res, next) {
    try{
      couponsModel.find({}, (err, products) => {
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
      couponsModel.find({_id: req.params.id}, (err, product) => {
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
      couponsModel.insertMany([req.body], (err, response) => {
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
      couponsModel.updateMany({ _id: req.params.id }, req.body,
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
      couponsModel.deleteMany({ _id: req.params.id },
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