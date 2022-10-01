const express = require('express');
const productServices =require('../services/product-services')
const userServices =require('../services/user-services')
const categoryServices =require('../services/category-services')
const cartServices =require('../services/cart-services');
const addressServices = require('../services/address-services');


module.exports ={

  getHome: async (req,res,next)=>{
    try{
      if(req.session.user){
        loginCheck = req.session.user
        categoryServices.getAllCategorys().then((data)=>{
          productServices.getProducts().then((products)=>{
            console.log("gethome products=",products)
             res.render('user/home/home',{loginCheck,data,products});
          })
        })
        res.render('user/home/home',{loginCheck,data});
      }
      else{
        categoryServices.getAllCategorys().then((data)=>{
          productServices.getProducts().then((products)=>{
            console.log("gethome products=",products)
            res.render('user/home/home',{data,products});
        })
      })
      }
    }catch(err){
      console.log(err)
    }
  },

  getLogin: async (req,res)=>{
    try{
     res.render('partials/user-login',{login:true});
    }catch(err){
      console.log(err)
    }
  },

  postLogin: async (req,res)=>{
    try{
      productId=req.query.productId;
      console.log("productId in login ==",productId)
      userServices.userLogin(req.body).then((response)=>{
        if(response.status){
          req.session.user=response.user.name;
          req.session.userId=response.user._id;
          loginCheck = req.session.user
          userId =  req.session.userId
          categoryServices.getAllCategorys().then((data)=>{
            if(productId == '' ){
                
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
                  console.log("cartProduct=",cartProduct)
                  if(cartProduct.length != 0){
                    res.render('user/cart/cart',{data,cartProduct,orderDetails}); 
                  }
                  else{
                    res.render('user/cart/emptyCart',{data}); 
                  }
                })
            }
            else{
              productServices.getSingleProduct(productId,req.session.userId).then((singleProduct)=>{
                cartStatus = singleProduct.status;
                res.render('user/product/singleProductView',{loginCheck,data,singleProduct,cartStatus});
            })
                 
            }
           
          
          })
         
          // res.redirect('/')
        }
        else{
          res.render('partials/user-login',{login:true,loginErr:true});
        }
     })
    }catch(err){
      console.log(err)
    }
  },

  
  getRegister: async (req,res)=>{
    try{
      res.render('partials/user-register',{register:true});
    }catch(err){
      console.log(err)
    }
  },

  postRegister: async (req,res)=>{
    try{
      userServices.userSignUp(req.body).then((response)=>{
        res.redirect('/login')
      }).catch((err)=>{
       res.render('partials/user-register',{register:true,err});
      })
    }catch(err){
      console.log(err)
    }
  },


  getLogout: async (req,res,next)=>{
    try{
      if(req.session.user){
         console.log("muhthar")
         req.session.user = '';
        //  req.session.destroy();
         res.redirect('/');
      }
    }catch(err){
      console.log(err)
    }
  },

  getUserProfile: async (req,res)=>{
    try{
        user = req.session.userId;
        categoryServices.getAllCategorys().then((data)=>{
            userServices.getUser(user).then((userDetails)=>{
              addressServices.getAllAddress(user).then((address)=>{
                console.log("user == ",userDetails)
                res.render('user/profile/userDetails', {data,userDetails,address});
              })
            })
         })
    }catch(err){
      console.log(err)
    }
  },

  updateUser: async (req,res)=>{
    try{
          userId = req.query.id;
          userServices.updateUser(req.body,userId).then((userDetails)=>{
          console.log("user == ",userDetails)
          res.redirect('/userProfile');
            
        })
    }catch(err){
      console.log(err)
    }
  }

}