const express = require('express');
const productServices =require('../services/product-services')
const categoryServices =require('../services/category-services')
const addressServices =require('../services/address-services')
const cartServices =require('../services/cart-services')
const orderServices =require('../services/order-services')
const couponServices =require('../services/coupon-services')


module.exports ={


  getCheckOut: async (req,res)=>{
    try{
      if(req.session.user){
          console.log("welcome cart")
          userId =  req.session.userId;
          categoryServices.getAllCategorys().then((data)=>{
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
                    orderDetails.single = false;
                    console.log("orderDetails in order cart=",orderDetails)
                    console.log("address=",address)
                  res.render('user/order/checkOut', {data,address,orderDetails,cartProduct});
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

  getOrder: async(req,res,next)=>{
    try{
      console.log("req.session.user=",req.session.user)
      if(req.session.user){
        userId= req.session.userId;
        orderId = req.query.orderId;
        console.log("req.body ==",req.body)
        categoryServices.getAllCategorys().then((data)=>{
           orderServices.getOrder(orderId,userId).then((order)=>{
               //quanti max set cheyyan
               for(let i = 0; i < order.length; i++){
                  order[i].singleProductPrice = order[i].product.productCount * order[i].product.price
                  order[i].singleProductPayPrice =  order[i].product.productCount * order[i]. product.offerprice
                  order[i].singleProductSavePrice = order[i].singleProductPrice - order[i].singleProductPayPrice
               }
               address = order[0].address
               let orderId = order[0]._id
              console.log("welcome order controll :=",order)
              res.render('user/order/orderDetails',{data,order,address,orderId});
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


  getAllOrder: async(req,res,next)=>{
    try{
      console.log("req.session.user=",req.session.user)
      if(req.session.user){
        userId= req.session.userId;
        console.log("req.body ==",req.body)
        categoryServices.getAllCategorys().then((data)=>{
           orderServices.getAllOrder(userId).then((order)=>{
            console.log("welcome order controll :=",order)
              res.render('user/order/orderList',{data,order});
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

  saveOrder: async(req,res,next)=>{
    try{
      console.log("req.session.user=",req.session.user)
      if(req.session.user){

        userId= req.session.userId;
        couponCode = req.session.couponCode;
        console.log("req.body ==",req.body)
        categoryServices.getAllCategorys().then((data)=>{
          ///
          couponServices.getCoupon(couponCode,userId).then((coupon)=>{
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
              
              console.log("orderDetails.couponAmount =",coupon[0] )
              if(coupon[0]==undefined){
              // TotalPrice
              req.body.orginalAmount = cartProduct.reduce((target,item)=>{
                return(target+item.total);
                },0)
              // Total Offer Price
              req.body.payAmount = cartProduct.reduce((target,item)=>{
                  return(target+item.offer);
                  },0)
            
              // save Amount
              req.body.saveAmount =req.body.orginalAmount -  req.body.payAmount

            

              console.log("req.body2 ==",req.body)
          
              ///
              orderServices.saveOrder(req.body,userId).then((result)=>{
                orderId = result.insertedId
                if(req.body.paymentType == 'Cash On Delivery'){
                    //res.redirect('/getAllOrder');
                    res.json({codSuccess:true})
                }
                else if(req.body.paymentType == 'UPI'){
                  //marakkaruthe avide cart remove comment ane
                  console.log("orderId:",result.insertedId)
                  orderId = result.insertedId
                  orderServices.generateRazorpay(orderId,req.body).then((order)=>{
                    console.log("Order generateRazorpay 1==",order)
                    res.json(order)
                  })
                }
                req.session.couponCode ="";
              })
             } else{
              //couponAmount
              req.body.couponAmount = coupon[0].discountPrice
              console.log("welcome with out copun")
                   // TotalPrice
              req.body.orginalAmount = cartProduct.reduce((target,item)=>{
                return(target+item.total);
                },0)
              // Total Offer Price
              req.body.payAmount = cartProduct.reduce((target,item)=>{
                  return(target+item.offer);
                  },0)


              // save Amount
              req.body.saveAmount =req.body.orginalAmount -  req.body.payAmount 

              req.body.payAmount =req.body.payAmount  - req.body.couponAmount

              console.log("req.body2 ==",req.body)
          
              ///
              orderServices.saveOrder(req.body,userId).then((result)=>{
                orderId = result.insertedId
                if(req.body.paymentType == 'Cash On Delivery'){
                    //res.redirect('/getAllOrder');
                    req.session.couponCode ="";
                    res.json({codSuccess:true})
                }
                else if(req.body.paymentType == 'UPI'){
                  //marakkaruthe avide cart remove comment ane
                  console.log("orderId:",result.insertedId)
                  orderId = result.insertedId
                  orderServices.generateRazorpay(orderId,req.body).then((order)=>{
                    console.log("Order generateRazorpay 2==",order)
                    req.session.couponCode ="";
                    res.json(order)
                  })
                }
              })
             }
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


  deleteOrder: async(req,res,next)=>{
    try{
      console.log("req.session.user=",req.session.user)
      if(req.session.user){
        userId= req.session.userId;
        orderId = req.query.id;
        productId = req.query.productId;
        console.log("req.body ==",req.body)
        categoryServices.getAllCategorys().then((data)=>{
          orderServices.deleteOrder(orderId,productId).then((result)=>{
            res.redirect('/getAllOrder');
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

  verifyPayment: async(req,res,next)=>{
    try{
      userId= req.session.userId;
      console.log("verifyPayment",req.body)
      orderServices.verifyPayment(req.body).then((result)=>{
          orderServices.changePaymentStatus(req.body['order[receipt]'],userId).then((result)=>{
              console.log("payment Sucess")
              res.json({status:true})
          })
      }).catch((err)=>{
         console.log("Payment Successfull");
         res.json({status:false,errMsg:'payment failed'})
      })

    }catch(err){
      console.log(err)
    }
  },

  getInvoice: async (req,res)=>{
    try{
      if(req.session.user){
        console.log("orderrid=",req.orderId)
        userId= req.session.userId;
        orderId = req.query.orderId;
        let subTotal =0;
        categoryServices.getAllCategorys().then((data)=>{
           orderServices.getOrder(orderId,userId).then((order)=>{
               //quanti max set cheyyan
               for(let i = 0; i < order.length; i++){
                  order[i].singleProductPrice = order[i].product.productCount * order[i].product.price
                  order[i].singleProductPayPrice =  order[i].product.productCount * order[i]. product.offerprice
                  order[i].singleProductSavePrice = order[i].singleProductPrice - order[i].singleProductPayPrice
                  subTotal += order[i].singleProductPayPrice
               }
               address = order[0].address
               let invoice = order[0].invoiceId
               let date = order[0].date
               let couponAmount = order[0].couponAmount
               let tatal = subTotal - couponAmount
              console.log("welcome order invoice controll :=",order)
              res.render('user/order/invoice',{data,order,address,subTotal,couponAmount,tatal,invoice,date,orderId});
            })
         })
      }
      else{
        res.render('partials/user-login',{login:true});
      }
    }catch(err){
      console.log(err)
    }

  }

}