const express = require('express');
const { FactorList } = require('twilio/lib/rest/verify/v2/service/entity/factor');
const categoryServices =require('../services/category-services')
const couponServices =require('../services/coupon-services')
const addressServices =require('../services/address-services')
const cartServices =require('../services/cart-services')

module.exports ={

  

  getAllCoupons: async (req,res)=>{
    try{
      if(req.session.user){
        loginCheck = req.session.user
        categoryServices.getAllCategorys().then((data)=>{
          couponServices.getAllCoupons().then((coupons)=>{
              console.log("coupons ==",coupons)
              res.render('user/coupon/couponList', {data,coupons,loginCheck});
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

  applayedUserStatus: async (req,res)=>{
    try{
     
      if(req.session.user){

        console.log("req.body=",req.body)

        req.session.couponCode = req.body.couponCode;
        totalAmount = req.body.totalAmount;
        couponCode=req.session.couponCode;
        userId = req.session.userId;

        console.log("Welcome couponCode=",couponCode)
        changeStatus =req.body;
      
        console.log("changeStatus ==",changeStatus)
          couponServices.applayedUserStatus(couponCode,userId,totalAmount).then((order)=>{
            console.log("welcome muhthar",order)
            let coupon=true
            res.json(coupon)
          }).catch((err)=>{
            console.log("welcome muhthar===",err)
            coupon=false
            res.json(coupon)
          })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getCoupon: async (req,res)=>{
    try{
      if(req.session.user){
        console.log("Welcome Coupon")
        loginCheck = req.session.user
        couponCode = req.session.couponCode;
        userId = req.session.userId;
        console.log("couponCod11==e",couponCode)
        console.log("userId==e",userId)
        categoryServices.getAllCategorys().then((data)=>{
          couponServices.getCoupon(couponCode,userId).then((coupon)=>{
            console.log("coupons ==",coupon)
            addressServices.getAllAddress(userId).then((address)=>{
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
                        orderDetails.productLength =cartProduct.length;

                        
                         //couponAmount
                         orderDetails.couponAmount = coupon[0].discountPrice

                        // TotalPrice
                        orderDetails.price = cartProduct.reduce((target,item)=>{
                          return(target+item.total);
                          },0)
                        // Total Offer Price
                          orderDetails.offerPrice = cartProduct.reduce((target,item)=>{
                            return(target+item.offer);
                            },0)
                            orderDetails.offerPrice =  orderDetails.offerPrice - orderDetails.couponAmount;
                          // save Amount
                          orderDetails.saveAmount =orderDetails.price -  orderDetails.offerPrice 
                          console.log("orderDetails ==",orderDetails)
                          console.log("address=",address)
                          res.render('user/order/checkOut', {data,address,orderDetails,cartProduct,loginCheck});
                  })
               })  
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

  


}