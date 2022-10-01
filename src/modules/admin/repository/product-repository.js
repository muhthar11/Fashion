var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');
var objectId =require('mongodb').ObjectId


module.exports={

  getProduct:(productId)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:objectId(productId)}).then((data)=>{
            resolve(data);
          })
          // let data=await db.get().collection(collections.PRODUCT_COLLECTION).
          // aggregate( [
          //         {
          //             $match:{
          //               _id:objectId(productId)
          //             }
          //         },
          //         {
          //           $lookup:
          //             {
          //               from: collections.category_COLLECTION,
          //               localField: "category",
          //               foreignField: "_id",
          //               as: "category"
          //             }
          //         },
          //         {
          //           $lookup:
          //             {
          //               from: collections.sub_Category_COLLECTION,
          //               localField: "subCategory",
          //               foreignField: "_id",
          //               as: "subCategory"
          //             }
          //         }
          //     ] ).toArray();
          //     resolve(data);
            })
  },
  
  getAllProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        // let prodects=await db.get().collection(collections.PRODUCT_COLLECTION).find({recordStatusId:1}).toArray();
        // console.log("prodects ="+prodects)
        // resolve(prodects);
        let prodects=await db.get().collection(collections.PRODUCT_COLLECTION).
        aggregate( [
                {
                    $match:{
                      recordStatusId:1
                    }
                },
                {
                  
                  $lookup:
                    {
                      from: collections.category_COLLECTION,
                      localField: "category",
                      foreignField: "_id",
                      as: "test"
                    }
              }
            ] ).toArray();
            resolve(prodects);
          })
        },



   updateProduct:(noSqlMode,productId,productDetails,adminId)=>{
      return new Promise(async(resolve,reject)=>{
        if(noSqlMode==1){
          productDetails.category =objectId(productDetails.category);
          productDetails.subCategory =objectId(productDetails.subCategory);
          productDetails.quantity = Number(productDetails.quantity);
          productDetails.price = Number( productDetails.price);
          productDetails.offerprice = Number(productDetails.offerprice);

          productDetails.status = false;
          productDetails.createdId = objectId(adminId) ;
          productDetails.createdDate =new Date();
          productDetails.recordStatusId =1;
          console.log("muhthar==",productDetails)
            db.get().collection(collections.PRODUCT_COLLECTION).insertOne(productDetails).then((data)=>{
              resolve(data);
            })
        }
        else if(noSqlMode==2){
          db.get().collection(collections.PRODUCT_COLLECTION).update({_id:objectId(productId)},{
            $set:{
                productName:productDetails.productName,
                brandName:productDetails.brandName,
                category:objectId(productDetails.category),
                subCategory:objectId(productDetails.category),
                quantity:Number(productDetails.quantity),
                price:Number(productDetails.price),
                offerPrice:Number(productDetails.offerPrice),
                size:productDetails.size,
                image:productDetails.image,

                modifiedId:objectId(adminId) ,
                modifiedDate:new Date(),
                recordStatusId : 1,
            }
            }).then((response)=>{
                resolve(response)
            })
        }
      })  
   },

    deleteProduct:(productId)=>{
          return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).update({_id:objectId(productId)},{
                $set:{
                    recordStatusId : 3,
                }
            }).then((response)=>{
                resolve(response)
            })
          })
   } ,

   changeStatus:(productId,status)=>{
    return new Promise(async(resolve,reject)=>{
      console.log("status=",status)
       if(status=="true"){
          db.get().collection(collections.PRODUCT_COLLECTION).update({_id:objectId(productId)},{
              $set:{
                  status:false
              }
          }).then((response)=>{
              resolve(response)
          })
        }
        else{
          db.get().collection(collections.PRODUCT_COLLECTION).update({_id:objectId(productId)},{
              $set:{
                  status:true
              }
          }).then((response)=>{
              resolve(response)
          })
        }
     })
   },

   getCategoryName:()=>{
     return new Promise(async(resolve,reject)=>{
       let category = await db.get().collection(collections.category_COLLECTION).find({recordStatusId:1}).toArray();
       console.log("categoryName=",category);
       resolve(category);
     })
   }


}
