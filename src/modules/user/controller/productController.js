const express = require('express');
//const productServices =require('../services/admin/product-services')
const categoryServices =require('../services/category-services')
const subCategoryServices =require('../services/subCategory-services')
const productServices =require('../services/product-services')

module.exports ={



  getProductList: async (req,res)=>{
    try{
      loginCheck = req.session.user
      categoryId = req.query.id
      categoryServices.getAllCategorys().then((data)=>{
        subCategoryServices.getAllSubCategorys(categoryId).then((subCategory)=>{
          productServices.getCategoryProducts(categoryId).then((products)=>{
            console.log("muhthr=",products)
            // for(i=0;i<products.length;i++){
            //   products[i].price =  products[i].result[0].price 
            //   products[i].offerPrice =  products[i].result[0].offerPrice 
            //   products[i].size = products[i].result[0].size
            //   }
             res.render('user/product/product',{loginCheck,data,subCategory,products,});
          })
        })
      })
    }catch(err){
      console.log(err)
    }
  },

 
  getSubProductList: async (req,res)=>{
    try{
      loginCheck = req.session.user
      subCategoryId = req.query.subCategoryId
      categoryId = req.query.categoryId
      categoryServices.getAllCategorys().then((data)=>{
        subCategoryServices.getAllSubCategorys(categoryId).then((subCategory)=>{
          productServices.getSubCategoryProducts(subCategoryId).then((products)=>{
            res.render('user/product/product',{loginCheck,data,subCategory,products});
          })
        })
      })
    }catch(err){
      console.log(err)
    }
  },

  getSingleProductView: async (req,res)=>{
    try{
      loginCheck = req.session.user
      productId = req.query.productId
      userId =  req.session.userId;
      
      categoryServices.getAllCategorys().then((data)=>{
        productServices.getSingleProduct(productId,userId).then((singleProduct)=>{
          console.log("singleProduct =",singleProduct.image)
          console.log("singleProduct muhthar =",singleProduct)
          cartStatus = singleProduct.status;
          // size = singleProduct[0].sizeResult;
          // singleProduct=singleProduct[0];
         
           res.render('user/product/singleProductView',{loginCheck,data,singleProduct,cartStatus});
          
        })
      })
    }catch(err){
      console.log(err)
    }
  }

 
}