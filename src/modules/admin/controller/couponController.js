const express = require('express');
//const productServices =require('../services/admin/product-services')
const couponServices =require("../services/coupon-services");
const voucher_codes = require('voucher-code-generator');


module.exports ={

  getCouponDetails: async (req,res)=>{
    try{
      if(req.session.admin){
          res.render('admin/coupon/couponDetails', {admin:true,adminName:req.session.admin });
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },


  getAllCoupon: async (req,res)=>{
    try{
      if(req.session.admin){
        couponServices.getAllCoupon().then((coupon)=>{
          console.log("coupon controller == ",coupon)
          res.render('admin/coupon/couponList', {admin:true,adminName:req.session.admin,coupon });
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },


  saveCoupon: async (req,res)=>{
    try{
      if(req.session.admin){
        const randomString1 = voucher_codes.generate({
                                  pattern: "###-###-###",
                              });
        coupon = randomString1;
        adminId=req.session.adminId
        couponDetails=req.body;
        couponDetails.coupon=coupon[0]
        console.log("welcome To coupon =",couponDetails)
        couponServices.saveCoupon(couponDetails,adminId).then((result)=>{
          res.redirect('/admin/getAllCoupon')
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },



  deleteCoupon: async (req,res,next)=>{
    try{
      if(req.session.admin){
         couponServices.deleteCoupon(req.query.id).then((result)=>{
          res.redirect('/admin/getAllCoupon')
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