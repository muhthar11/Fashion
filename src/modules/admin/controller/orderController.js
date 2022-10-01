const express = require('express');
const { response } = require('../../../../app');
//const productServices =require('../services/admin/product-services')
const orderServices =require('../services/order-services')
const orderStatusServices =require("../services/order-status-services")

module.exports ={

  getOrder: async(req,res,next)=>{
    try{
      if(req.session.admin){
        orderId = req.query.orderId;
           orderServices.getOrder(orderId).then((order)=>{
            // orderServices.getOrderStatus().then((orderStatus)=>{
               //quanti max set cheyyan
               for(let i = 0; i < order.length; i++){
                  order[i].singleProductPrice = order[i].product.productCount * order[i].product.price
                  order[i].singleProductPayPrice =  order[i].product.productCount * order[i]. product.offerprice
                  order[i].singleProductSavePrice = order[i].singleProductPrice - order[i].singleProductPayPrice
               }
              console.log("welcome order get controll :=",order)
              res.render('admin/order/orderDetails', {admin:true,order,adminName:req.session.admin ,orderId});
            })
          // })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getSingleOrder: async(req,res,next)=>{
    try{
      if(req.session.admin){
        orderId = req.query.orderId;
        productId = req.query.productId;
        orderStatusServices.getAllOrderStatus().then((orderStatus)=>{
           orderServices.getSingleOrder(orderId,productId).then((order)=>{
               //quanti max set cheyyan
               for(let i = 0; i < order.length; i++){
                  order[i].singleProductPrice = order[i].product.productCount * order[i].product.price
                  order[i].singleProductPayPrice =  order[i].product.productCount * order[i]. product.offerprice
                  order[i].singleProductSavePrice = order[i].singleProductPrice - order[i].singleProductPayPrice
               }
              console.log("welcome order controll :=",order)
              console.log("orderStatus:=",orderStatus)
              res.render('admin/order/singleOrderDetails', {admin:true,order,orderStatus,orderId,productId,adminName:req.session.admin });
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

  getAllOrder: async (req,res)=>{
    try{
      if(req.session.admin){
        orderServices.getAllOrder().then((order)=>{
          res.render('admin/order/orderList', {admin:true,order,adminName:req.session.admin });
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },


  changeOrderStatus: async (req,res)=>{
    try{
     
      if(req.session.admin){

        console.log("req.body=",req.body)
        orderId = req.body.orderId;
        productId =req.session.productId;
        console.log("Welcome Body")
        changeStatus =req.body;
        
        console.log("orderId ==",orderId)
        console.log("productId ==",productId)
        console.log("changeStatus ==",changeStatus)
        orderServices.changeOrderStatus(orderId,productId,changeStatus).then((order)=>{
           res.status(201).json()
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

 

}