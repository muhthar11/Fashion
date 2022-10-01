const express = require('express');
//const productServices =require('../services/admin/product-services')
const userServices =require('../services/user-services');


module.exports ={

  getUserList: async (req,res)=>{
    try{
      if(req.session.admin){
        userServices.getAllUsers().then((data)=>{
          console.log("data == ",data)
          res.render('admin/user/userList', {admin:true,adminName:req.session.admin,data });
        })
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  getUser: async (req,res,next)=>{
    try{
      if(req.session.admin){
        let user = await userServices.getUser(req.query.id)
          res.render('admin/user/userDetails',{user,admin:true,adminName:req.session.admin})
      }
      else{
        res.redirect('/admin');
      }
    }catch(err){
      console.log(err)
    }
  },

  saveUser:  async (req,res,next)=>{
    try{
      if(req.session.admin){
      
        userServices.updateUser(req.query.id,req.body,req.session.adminId).then((result)=>{
          res.redirect('/admin/userList')
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


  deleteUser: async (req,res,next)=>{
    try{
      if(req.session.admin){
        userServices.deleteUser(req.query.id).then((result)=>{
          res.redirect('/admin/userList')
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
        userServices.changeStatus(req.query.id,req.query.status).then((result)=>{
          res.redirect('/admin/userList')
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