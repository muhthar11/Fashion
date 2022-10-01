const express = require('express');
//const productServices =require('../services/admin/product-services')
const orderStatusServices =require("../services/order-status-services")

module.exports ={

  getOrderStatus: async(req,res)=>{
    try{
      if(req.session.admin){
        console.log("body =",req.body)
        productId=req.body.productId
        req.session.productId=req.body.productId//change order status use 
        orderId=req.body.orderId
        console.log("productId =",productId)
        console.log("orderId =",orderId)
        orderStatusServices.getOrderStatus(orderId,productId).then((orderStatus)=>{
          res.json(orderStatus)
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },
  


  getAllOrderStatus: async (req,res)=>{
    try{
      if(req.session.admin){
        orderStatusServices.getAllOrderStatus().then((data)=>{
          console.log("data == ",data)
          res.render('admin/orderStatus/orderStatusList', {admin:true,adminName:req.session.admin,data });
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  saveOrderStatus:  async (req,res,next)=>{
    try{
      if(req.session.admin){
        console.log("body=", req.body);
     
          orderStatusServices.updateOrderStatus(req.body,req.session.adminId).then((result)=>{
            res.redirect('/admin/getAllOrderStatus')
          }).catch((err)=>{
            console.log("error found",err);
          })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },


  deleteOrderStatus: async (req,res,next)=>{
    try{
      if(req.session.admin){
        orderStatusServices.deleteOrderStatus(req.query.id).then((result)=>{
          res.redirect('/admin/getAllOrderStatus')
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