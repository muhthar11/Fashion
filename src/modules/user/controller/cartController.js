const express = require('express');
//const productServices =require('../services/admin/product-services')
const cartServices =require('../services/cart-services')
const categoryServices =require('../services/category-services')
const productServices =require('../services/product-services')

module.exports ={

  addCart: async (req,res)=>{
    try{  
      console.log("muhthar =",req.body)
      console.log("muhthar =",req.query)
      if(req.body.productCount == undefined){
           req.body.productCount = 1
      }
      console.log("muhthar =",req.body.productCount)
      productId = req.query.productId;
      if(req.session.user){
        userId= req.session.userId;
        loginCheck = req.session.user
      
        categoryServices.getAllCategorys().then((data)=>{

             cartServices.addCart(productId,req.body,userId).then((result)=>{
                productServices.getSingleProduct(productId,userId).then((singleProduct)=>{
                  console.log("cartStatus=",singleProduct.status)
                  cartStatus = singleProduct.status;
                    res.render('user/product/singleProductView',{data,singleProduct,cartStatus,loginCheck});
                })

            })
        }) 
      }
      else{
        res.render('partials/user-login',{login:true,productId});
      }
    }catch(err){
      console.log(err)
    }
  },


  getCart: async (req,res)=>{
    try{
      if(req.session.user){
      userId = req.session.userId;
      loginCheck = req.session.user
      categoryServices.getAllCategorys().then((data)=>{
         cartServices.getCart(userId).then((cartProduct)=>{
          //quanti max set cheyyan
          for(let i = 0; i < cartProduct.length; i++){
           cartProduct[i].quantity = cartProduct[i].products[0].quantity
           cartProduct[i].total = cartProduct[i].productCount * cartProduct[i].price
           cartProduct[i].offer = cartProduct[i].productCount * cartProduct[i].offerprice
           if(cartProduct[i].productCount > 1){
             cartProduct[i].sub = true
           }
           else{
             cartProduct[i].sub = false
           }
          }
          //order list
          let orderDetails = {};
          //Total Cart length
          orderDetails.cartLength =cartProduct.length;
          // TotalPrice
           orderDetails.price = cartProduct.reduce((target,item)=>{
            return(target+item.total);
            },0)
           // Total Offer Price
            orderDetails.offerPrice = cartProduct.reduce((target,item)=>{
              return(target+item.offer);
              },0)
            // save Amount
            orderDetails.saveAmount =orderDetails.price -  orderDetails.offerPrice
            console.log("orderDetails=",orderDetails)
            console.log("cartProduct=",cartProduct.length)
            if(cartProduct.length != 0){
              res.render('user/cart/cart',{data,cartProduct,orderDetails,loginCheck}); 
            }
            else{
              res.render('user/cart/emptyCart',{data}); 
            }
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

  deleteCart: async (req,res,next)=>{
    try{
      if(req.session.user){
        loginCheck = req.session.user
        cartServices.deleteCart(req.query.id).then((result)=>{
            if(req.query.order){
              res.redirect("/getCheckOut");
            }
            else{
              res.redirect("/getCart");
            }
        })
      }
      else{
        res.render('partials/user-login',{login:true,productId,loginCheck});
      }
    }catch(err){
      console.log(err)
    }
  },



  addCount: async (req,res)=>{
    try{
    //  console.log("==",req.query.order)
      productId = req.query.productId;
      productCount =Number(req.query.count)+1;
      if(req.session.user){
        userId= req.session.userId;
        loginCheck = req.session.user
             cartServices.count(productId,productCount,userId).then((result)=>{
              if(req.query.order){
                res.redirect("/getCheckOut");
              }
              else{
                res.redirect("/getCart");
              }
              })
      }
      else{
        res.render('partials/user-login',{login:true,productId,loginCheck});
      }
    }catch(err){
      console.log(err)
    }
  },

  subCount: async (req,res)=>{
    try{
      productId = req.query.productId;
      productCount =Number(req.query.count)-1;
      if(req.session.user){
        userId= req.session.userId;
        loginCheck = req.session.user
             cartServices.count(productId,productCount,userId).then((result)=>{
              if(req.query.order){
                res.redirect("/getCheckOut");
              }
              else{
                res.redirect("/getCart");
              }
              })
      }
      else{
        res.render('partials/user-login',{login:true,productId,loginCheck});
      }
    }catch(err){
      console.log(err)
    }
  },

}