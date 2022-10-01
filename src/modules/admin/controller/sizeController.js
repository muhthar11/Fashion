const express = require('express');
//const productServices =require('../services/admin/product-services')
const sizeServices =require("../services/size-services")

module.exports ={

  getDeatailsPage: async (req,res)=>{
    try{
      if(req.session.admin){
        sizeServices.getCategoryName().then((category)=>{
            res.render('admin/size/sizeDetails', {admin:true,category});
          })
        }
        else{ 
          res.redirect('/admin');
        }
    }catch(err){
      console.log(err)
    }
  },

  getSizeList: async (req,res)=>{
    try{
      if(req.session.admin){
        sizeServices.getAllSizes().then((data)=>{
          console.log("data == ",data)
          res.render('admin/size/sizeList', {admin:true,adminName:req.session.admin,data });
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getSize: async (req,res,next)=>{
    try{
      if(req.session.admin){
        let size = await sizeServices.getSize(req.query.id)
        sizeServices.getCategoryName().then((category)=>{
        res.render('admin/size/sizeDetails',{size,category,admin:true,adminName:req.session.admin,check:true})
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  saveSize:  async (req,res,next)=>{
    try{
      if(req.session.admin){

        console.log("req.id =",req.query)
        console.log("body=", req.body);
     
          sizeServices.updateSize(req.query.id,req.body,req.session.adminId).then((result)=>{
            res.redirect('/admin/sizeList')
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


  deleteSize: async (req,res,next)=>{
    try{
      if(req.session.admin){
        sizeServices.deleteSize(req.query.id).then((result)=>{
          res.redirect('/admin/sizeList')
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