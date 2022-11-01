const express = require('express');
//const productServices =require('../services/admin/product-services')
const wishlistServices =require('../services/wishlist-services')
const categoryServices =require('../services/category-services')
const productServices =require('../services/product-services')

module.exports ={

  addWishlist: async (req,res)=>{
    try{
      console.log("req.body=",req.body)
      productId = req.body.productId;
      console.log("req.body.productId=",req.body.productId)
      if(req.session.user){

        userId= req.session.userId;
        categoryServices.getAllCategorys().then((data)=>{
          productServices.getSingleProduct(productId,userId).then((singleProduct)=>{          
                console.log("singleProduct=",singleProduct)
                let body={}
                body.price=singleProduct.price
                body.offerprice=singleProduct.offerPrice
                wishlistServices.addWishlist(productId,body,userId).then((result)=>{
                    cartStatus = singleProduct.status;
                    res.json('result');
               
                })
            })
        }) 
      }
      else{
        res.json("login");
      }
    }catch(err){
      console.log(err)
    }
  },


  getWishlist: async (req,res)=>{
    try{
      if(req.session.user){
      loginCheck = req.session.user
      userId = req.session.userId;
      categoryServices.getAllCategorys().then((data)=>{
        wishlistServices.getWishlist(userId).then((wishlistProduct)=>{
              for(let i=0;i<wishlistProduct.length;i++){
                if( wishlistProduct[i].products[0].quantity <= 0){
                     wishlistProduct[i].status = false
                } else{
                     wishlistProduct[i].status = true
                }
              }
              console.log("wishlistProduct=",wishlistProduct)
              if(wishlistProduct.length != 0){
                res.render('user/wishlist/wishlist',{data,wishlistProduct,loginCheck});
              }
              else{
                res.render('user/wishlist/emptyWishlist',{data}); 
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

  deleteWishlist: async (req,res,next)=>{
    try{
      if(req.session.user){
        loginCheck = req.session.user
        wishlistServices.deleteWishlist(req.query.id).then((result)=>{
          userId = req.session.userId;
            categoryServices.getAllCategorys().then((data)=>{
              wishlistServices.getWishlist(userId).then((wishlistProduct)=>{
                  // console.log("wishlistProduct=",wishlistProduct)
                  for(let i=0;i<wishlistProduct.length;i++){
                    if( wishlistProduct[i].products[0].quantity <= 0){
                         wishlistProduct[i].status = false
                    } else{
                         wishlistProduct[i].status = true
                    }
                  }
                      res.render('user/wishlist/wishlist',{data,wishlistProduct,loginCheck});
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


}