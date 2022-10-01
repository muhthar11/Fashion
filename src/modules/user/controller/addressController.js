const express = require('express');
const cartServices =require('../services/cart-services')
const categoryServices =require('../services/category-services')
const addressServices =require('../services/address-services')

module.exports ={

  getAddress: async (req,res)=>{
    try{
      path =req.query.path
      if(req.session.user){
        addressId = req.query.id
        userId = req.session.userId;
        categoryServices.getAllCategorys().then((data)=>{
            addressServices.getAddress(addressId).then((address)=>{
              console.log("Adress ==",address)
              res.render('user/order/addressDetails', {data,address,path});
            })
          })
      }
      else{
        res.render('partials/user-login',{login:true});
      }
    }catch(err){
      console.log(err)
    }
  },


  getAddressPage: async (req,res)=>{
    try{
      path =req.query.path
      console.log("path =",req.query)
      console.log("path =",path)
      if(req.session.user){
        categoryServices.getAllCategorys().then((data)=>{
           res.render('user/order/addressDetails', {data,path});
          })
       }
       else{ 
          res.render('partials/user-login',{login:true});
       }
    }catch(err){
      console.log(err)
    }
  },




  saveAddress: async (req,res,next)=>{
    try{
      console.log("req.query.path saveAddress=",req.query.path)
      if(req.session.user){
        
        console.log("req.id =",req.query)
        console.log("body=", req.body);
        userId = req.session.userId;
        addresId = req.query.id;
        addressServices.updateAddress(addresId,req.body,userId).then((result)=>{

          if(req.query.path == 'cart'){
            res.redirect('/getCheckOut')
          }else if(req.query.path == 'address'){
            res.redirect('/userProfile')
          }
        })
  
      }
      else{
        res.render('partials/user-login',{login:true});
      }
    }catch(err){
      console.log(err)
    }
  },

}