const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const bcrypt=require('bcrypt');
const productServices = require('../services/product-services');
const objectId =require('mongodb').ObjectId

module.exports={
    

    
    addCart:(noSqlMode,productId,cartDetails,userId,sizeId)=>{
        return new Promise(async(resolve,reject)=>{
          if(noSqlMode==1){
              let cart=await db.get().collection(collections.CART_CALLECTION).findOne({$and:[{productId:objectId(productId),userId:objectId(userId),recordStatusId : 1}]});
              console.log("single product cart =",cart)
              if(cart == null){
                cartDetails.productId = objectId(productId) ;
                cartDetails.sizeId = objectId(sizeId);
                cartDetails.price = Number( cartDetails.price);
                cartDetails.offerprice = Number(cartDetails.offerprice);
                cartDetails.productCount = Number(cartDetails.productCount);

                cartDetails.userId = objectId(userId);
                cartDetails.createdDate =new Date();
                cartDetails.recordStatusId = 1;
                  db.get().collection(collections.CART_CALLECTION).insertOne(cartDetails).then((data)=>{
                    resolve(data);
                  })
              } 
              else{
                 resolve("All Ready Exit")
              }
           }
           
        })  
     },


  getCart:(userId)=>{
    return new Promise(async(resolve,reject)=>{
   

            let cartProduct =await db.get().collection(collections.CART_CALLECTION).aggregate([
              { $match:
                { $and:
                  [{ 
                    recordStatusId: 1 , 
                    userId:objectId(userId),
                  }] 
                } 
              },
              {
                $lookup:{
                  from: "products",
                  localField: "productId",
                  foreignField: "_id",
                  as: "products"
                }
              }
            ]).toArray();
        resolve(cartProduct);
      })
  },

  deleteCart:(cartId)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collections.CART_CALLECTION).update({_id:objectId(cartId)},{
          $set:{
              modifydate : new Date(),
              recordStatusId : 3,
          }
      }).then((response)=>{
          resolve(response)
      })
    })
} ,

count:(productId,count,userId)=>{
  return new Promise(async(resolve,reject)=>{
    db.get().collection(collections.CART_CALLECTION).update({$and:[{productId:objectId(productId),userId:objectId(userId)}]},
    {
        $set:{
            productCount : count,
            modifydate : new Date()
        }
    }).then((response)=>{
        resolve(response)
    })
  })
} 
   
}