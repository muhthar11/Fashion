const express = require('express');
//const productServices =require('../services/admin/product-services')
const loginServices =require('../services/login-services');
const userServices =require('../services/user-services');
const orderServices =require('../services/order-services');
const productServices =require('../services/product-services')



module.exports ={


  getLogin: async (req,res)=>{
    try{
        res.render('partials/admin-login',{adminLogin:true});
    }catch(err){
      console.log(err)
    }
  },

  postLogin: async (req,res)=>{
    try{
      loginServices.adminLogin(req.body).then((response)=>{
      if(response.status){
        req.session.adminId =response.admin._id;
        req.session.admin = response.admin.userName;
        console.log(" req.session.admin=", req.session.admin)
        res.redirect('/admin/home');
        }
        else{
          res.render('partials/admin-login',{adminLogin:true,loginErr:true})
          this. loginErr=false
        }
      })  
    }catch(err){
      console.log(err)
    }
  },

  getHome: async (req,res,next)=>{
    try{
      console.log("1234 =",req.session.admin)
      if(  req.session.admin){
        let dashbord = [];
        userServices.getAllUsers().then((user)=>{
          orderServices.getAllOrder().then((order)=>{
            productServices.getAllProducts().then((product)=>{
              loginServices.getAllOrderStatus().then((orderStatus)=>{
                loginServices.getAllPaymentStatus().then((paymentStatus)=>{
                    loginServices.getAllDeliveryStatus().then((deliveryStatus)=>{
                      console.log("orderStatus=",orderStatus)
                      dashbord.totalUsers = user.length
                      dashbord.totalOrders =order.length
                      dashbord.totalProducts =product.length
                      dashbord.orderStatus=orderStatus
                      dashbord.paymentStatus=paymentStatus
                      dashbord.deliveryStatus=deliveryStatus//category wise
                      console.log("dashbord == ", dashbord)
          
                      res.render('admin/dashbord/home', {admin:true,adminName:req.session.admin ,dashbord});
                    })
                  })  
               })
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

  getLogout: async (req,res,next)=>{
    try{
      if(req.session.admin){
         console.log("muhthar")
          // req.session.destroy() ;
          req.session.admin = null;
          res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

}