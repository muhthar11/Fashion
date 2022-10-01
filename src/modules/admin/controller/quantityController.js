const express = require('express');
//const productServices =require('../services/admin/product-services')
const sizeServices =require("../services/size-services")
const quantityServices =require('../services/quantity-services');
module.exports ={

  getQuantityList: async (req,res)=>{
    try{
      if(req.session.admin){
        productId=req.query.id;
        quantityServices.getAllQuantity(productId).then((quantity)=>{
            sizeServices.getAllSizes().then((size)=>{
                res.render('admin/quantity/quantityDetails', {size,admin:true,adminName:req.session.admin,productId,quantity});
            })
        })
      }
      else{ 
         res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  saveQuantity: async (req,res,next)=>{
    try{
      if(req.session.admin){
  
        console.log("req.id =",req.query)
        console.log("body=", req.body);
        productId = req.query.productId;
  
          quantityServices.updateQuantity(productId,req.body,req.session.adminId).then((result)=>{
              quantityServices.getAllQuantity(productId).then((quantity)=>{
                  sizeServices.getAllSizes().then((size)=>{
                      res.render('admin/quantity/quantityDetails', {size,admin:true,adminName:req.session.admin,productId,quantity});
                  })
              })
          })
  
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  deleteQuantity:  async (req,res,next)=>{
    try{
      if(req.session.admin){
        quantityServices.deleteQuantity(req.query.id).then((result)=>{
          quantityServices.getAllQuantity(productId).then((quantity)=>{
              sizeServices.getAllSizes().then((size)=>{
                  res.render('admin/quantity/quantityDetails', {size,admin:true,adminName:req.session.admin,productId,quantity});
              })
          })
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  }

}