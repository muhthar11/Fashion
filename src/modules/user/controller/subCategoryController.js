const express = require('express');
//const productServices =require('../services/admin/product-services')
const subCategoryServices =require('../services/subCategory-services')


module.exports ={

  getSubCategoryList: async (req,res)=>{
    try{
        categoryId=req.query.id;
        console.log("categoryId1232=",categoryId)
        subCategoryServices.getAllSubCategorys(req.query.id).then((subCategory)=>{
          res.render('user/product/product', {subCategory,categoryId});
        })
    }catch(err){
      console.log(err)
    }
  },


}