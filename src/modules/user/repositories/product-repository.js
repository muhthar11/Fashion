const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const objectId =require('mongodb').ObjectId


module.exports={

  getProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let product=await db.get().collection(collections.PRODUCT_COLLECTION)
          .find(
            {
              $and:
              [{
                recordStatusId:1,

                status:true
              }]
            }
            ).toArray();
       resolve(product);
        })

  },

  getCategoryProducts:(categoryId)=>{
    
    return new Promise(async(resolve,reject)=>{
      console.log("text category =",categoryId)
        // let product=await db.get().collection(collections.PRODUCT_COLLECTION).find({$and:[{recordStatusId:1,category:objectId(categoryId),status:true}]}).toArray();
        // console.log("CategoryProducts ="+product)
        // resolve(product);
        // })
        console.log("text category =",categoryId)
        let product =await db.get().collection(collections.PRODUCT_COLLECTION).aggregate([
              { $match:
                { $and:
                  [{ 
                    recordStatusId: 1 , 
                    category:objectId(categoryId) , 
                    status:true
                  }] 
                } 
              },
              {
                $lookup:{
                  from: "quantity",
                  localField: "_id",
                  foreignField: "productId",
                  as: "result"
                }
              },
            ]).toArray();
            
          console.log(" Category product ="+product)
          resolve(product);
  })


  },

  getSubCategoryProducts:(subCategoryId)=>{
      return new Promise(async(resolve,reject)=>{
          let product=await db.get().collection(collections.PRODUCT_COLLECTION).find({$and:[{recordStatusId:1,subCategory:objectId(subCategoryId),status:true}]}).toArray();
          console.log("sub Category product ="+product)
          resolve(product);
          })
  },

  getSingleProduct:(productId,userId)=>{
    return new Promise(async(resolve,reject)=>{
         console.log("muh product ==",productId);
         console.log("muht user id ==",userId)
       
          let cart=await db.get().collection(collections.CART_CALLECTION).findOne({$and:[{productId:objectId(productId),userId:objectId(userId),recordStatusId : 1}]});
          console.log("single product cart =",cart)
          db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:objectId(productId)}).then((singleProduct)=>{
            if(cart != null)
            {
              singleProduct.status = true;
              console.log(" singleProduct.status =", singleProduct.status)
            }
            else{
              singleProduct.status = false;
              console.log(" singleProduct.status =", singleProduct.status)
            }
              resolve(singleProduct);
            })

            // let singleProduct =await db.get().collection(collections.PRODUCT_COLLECTION).aggregate([
            //   { $match:
            //     { $and:
            //       [{ 
            //         recordStatusId: 1 , 
            //         _id:objectId(productId)
            //       }] 
            //     } 
            //   },
            //   {
            //     $lookup:{
            //       from: "quantity",
            //       localField: "_id",
            //       foreignField: "productId",
            //       as: "result"
            //     }
            //   },
            //   {
            //     $lookup:{
            //       from: "size",
            //       localField: "result.size",
            //       foreignField: "_id",
            //       as: "sizeResult"
            //     }
            //   },
            // ]).toArray();
            // if(cart != null)
            // {
            //   singleProduct.status = true;
            //   console.log(" singleProduct.status =", singleProduct.status)
            // }
        //resolve(singleProduct);
      })
  },

  getQuantity:(sizeId,productId)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collections.quantity_COLLECTION).findOne({size:objectId(sizeId),productId:objectId(productId)}).then((quantity)=>{
            resolve(quantity);
          })
    })
  },

  

}
