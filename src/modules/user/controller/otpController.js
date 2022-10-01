const express = require('express');
//const productServices =require('../services/admin/product-services')
const otpServices =require('../services/otp-services')

module.exports ={

  
 
  getOtp: async (req,res)=>{
   
    req.session.userDetails = req.body;
    console.log("welcome,",req.session.userDetails)
    userDetails = req.body;
    try{
      otpServices.getOtp(userDetails).then((result)=>{
        res.render('partials/otp-validation',{otp:true,userDetails});
      }).catch((err)=>{
        res.render('partials/user-register',{register:true,err});
       })
    }catch(err){
      console.log(err)
    }
  },

  verifyOtp: async (req,res)=>{
   console.log(" req.session.userDetails=", req.session.userDetails)
    verifyOtp = req.body.otp
    try{
      otpServices.verifyOtp(verifyOtp,req.session.userDetails).then((result)=>{
        res.render('partials/user-login',{login:true,loginErr:true});
      })
     
    }catch(err){
      console.log(err)
    }
  }

}