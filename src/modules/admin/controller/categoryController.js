const express = require('express');
//const productServices =require('../services/admin/product-services')
const categoryServices =require('../services/category-services')


module.exports ={

  getDeatailsPage: async (req,res)=>{
    try{
      if(req.session.admin){
        res.render('admin/category/categoryDetails', {admin:true,adminName:req.session.admin });
       }
       else{ 
          res.redirect('/admin');
       }
    }catch(err){
      console.log(err)
    }
  },

  getCategoryList: async (req,res)=>{
    try{
      if(req.session.admin){
        categoryServices.getAllCategorys().then((data)=>{
          res.render('admin/category/categoryList', {admin:true,data,adminName:req.session.admin });
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getCategory: async (req,res,next)=>{
    try{
      if(req.session.admin){
        let category = await categoryServices.getCategory(req.query.id)
        res.render('admin/category/categoryDetails',{category,admin:true,adminName:req.session.admin})
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  saveCategory:  async (req,res,next)=>{
    try{
      if(req.session.admin){

        const images = req.files
        array = images.map((value)=>value.filename)
        req.body.image = array
        console.log("req.id =",req.query)
        console.log("body=", req.body);
      
        categoryServices.updateCategory(req.query.id,req.body,req.session.adminId).then((result)=>{
          res.redirect('/admin/categoryList')
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },


  deleteCategory: async (req,res,next)=>{
    try{
      if(req.session.admin){
        console.log("Delete=",req.query.id)
        categoryServices.deleteCategory(req.query.id).then((result)=>{
          res.redirect('/admin/categoryList')
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  
  status: async (req,res,next)=>{
    try{
      if(req.session.admin){
        categoryServices.changeStatus(req.query.id,req.query.status).then((result)=>{
          res.redirect('/admin//categoryList')
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