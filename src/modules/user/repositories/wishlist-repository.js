const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const bcrypt=require('bcrypt');
const productServices = require('../services/product-services');
const objectId =require('mongodb').ObjectId

module.exports={
    

    
    addWishlist:(noSqlMode,productId,wishDetails,userId,sizeId)=>{
        return new Promise(async(resolve,reject)=>{
          if(noSqlMode==1){
              let wishlist=await db.get().collection(collections.WISHLIST_CALLECTION).findOne({$and:[{productId:objectId(productId),userId:objectId(userId),recordStatusId : 1}]});
              console.log("single product cart =",wishlist)
              if(wishlist == null){
                wishDetails.productId = objectId(productId) ;
                wishDetails.price = Number( wishDetails.price);
                wishDetails.offerprice = Number(wishDetails.offerprice);

                wishDetails.userId = objectId(userId);
                wishDetails.createdDate =new Date();
                wishDetails.recordStatusId = 1;
                  db.get().collection(collections.WISHLIST_CALLECTION).insertOne(wishDetails).then((data)=>{
                    resolve(data);
                  })
              } 
              else{
                 resolve("All Ready Exit")
              }
           }
           
        })  
     },


  getWishlist:(userId)=>{
    return new Promise(async(resolve,reject)=>{
   

            let wishlistProduct =await db.get().collection(collections.WISHLIST_CALLECTION).aggregate([
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
           // console.log("wishlistProduct=",wishlistProduct)
        resolve(wishlistProduct);
      })
  },

  deleteWishlist:(wishlistId)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collections.WISHLIST_CALLECTION).update({_id:objectId(wishlistId)},{
          $set:{
              modifydate : new Date(),
              recordStatusId : 3,
          }
      }).then((response)=>{
          resolve(response)
      })
    })
} 
   
}