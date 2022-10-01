const express = require('express');
//const productServices =require('../services/admin/product-services')
const subCategoryServices =require('../../admin/services/subCategory-services')
const categoryServices =require('../../admin/services/category-services')


module.exports ={

  getDeatailsPage: async (req,res)=>{
    try{
      if(req.session.admin){
        let category = await categoryServices.getCategory(req.query.categoryId)
        category.categoryId = category._id;
        category._id = '';
        res.render('admin/category/subCategoryDetails', {admin:true,adminName:req.session.admin,category});
      }
      else{ 
         res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getSubCategoryList: async (req,res)=>{
    try{
      if(req.session.admin){
        categoryId=req.query.id;
        console.log("categoryId1232=",categoryId)
        subCategoryServices.getAllSubCategorys(req.query.id).then((data)=>{
          res.render('admin/category/subCategoryList', {admin:true,adminName:req.session.admin,data,categoryId});
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getSubCategory: async (req,res,next)=>{
    try{
      if(req.session.admin){
        let category = await subCategoryServices.getSubCategory(req.query.id)
        console.log("category132=" ,category)
        res.render('admin/category/subCategoryDetails',{category,admin:true,adminName:req.session.admin})
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  saveSubCategory:  async (req,res,next)=>{
    try{
      if(req.session.admin){

        const images = req.files
        console.log("images =",images)
        array = images.map((value)=>value.filename)
        req.body.image = array

        console.log("req.id =",req.query)
        console.log("body=", req.body);
     
        subCategoryServices.updateSubCategory(req.query.categoryId,req.query.id,req.body,req.session.adminId).then((result)=>{
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


  deleteSubCategory: async (req,res,next)=>{
    try{
      if(req.session.admin){
        subCategoryServices.deleteSubCategory(req.query.id).then((result)=>{
          res.redirect('/admin/categoryList')
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