const express = require('express');
//const productServices =require('../services/admin/product-services')
const productServices =require('../services/product-services')
const subCategoryrRpository =require('../repository/subCategory-repository')
const sizeServices = require('../services/size-services')


module.exports ={

  getDeatailsPage: async (req,res)=>{
    try{
      if(req.session.admin){
        productServices.getCategoryName().then((category)=>{
            res.render('admin/products/productDetails', {category,admin:true,adminName:req.session.admin});
        })
      }
      else{ 
         res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getProductList: async (req,res)=>{
    try{
      if(req.session.admin){
        productServices.getAllProducts().then((data)=>{
          console.log("data == ",data)
      //    console.log("data category == ",data[0].test[0].categoryName)
          res.render('admin/products/productList', {admin:true,data,adminName:req.session.admin });
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getProduct: async (req,res,next)=>{
    try{
      if(req.session.admin){
        let product = await productServices.getProduct(req.query.id)
        console.log("products in gtr =="+product  )
        sizeServices.getAllSizes().then((size)=>{
          res.render('admin/products/productDetails',{product,size,admin:true,adminName:req.session.admin,categoryCheck:true})
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  saveProduct:  async (req,res,next)=>{
    try{
      if(req.session.admin){
    
        const images = req.files
        console.log("image =",images)
        array = images.map((value)=>value.filename)
        req.body.image = array
        console.log("req.id =",req.query)
        console.log("body=", req.body);
    
          productServices.updateProduct(req.query.id,req.body,req.session.adminId).then((result)=>{
            res.redirect('/admin/productList')
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


  deleteProduct: async (req,res,next)=>{
    try{
      if(req.session.admin){
        productServices.deleteProduct(req.query.id).then((result)=>{
          res.redirect('/admin/productList')
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
        productServices.changeStatus(req.query.id,req.query.status).then((result)=>{
          res.redirect('/admin/productList')
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getData: async (req,res,next)=>{
    try{
      var type = req.query.type;
      console.log("type=",type);
      var search_query = req.query.parent_value;
      console.log("search_query=",search_query);
      if(type == 'load_subcategory')
      {
        let sc = await subCategoryrRpository.getAllSubCategorys(search_query)
        console.log("sc =",sc)
        res.json(sc);
      }
    }catch(err){
      console.log(err)
    }
  }


}