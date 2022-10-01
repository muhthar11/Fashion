const express = require('express');
//const productServices =require('../services/admin/product-services')
const categoryServices =require('../services/category-services')


module.exports ={



  getCategoryList: async (req,res)=>{
    try{
      if(req.session.user){
        categoryServices.getAllCategorys().then((data)=>{
          res.render('user/home/home',{loginCheck,data});
        })
      }
      else{
        res.redirect('/');
      }
    }catch(err){
      console.log(err)
    }
  },

 

}