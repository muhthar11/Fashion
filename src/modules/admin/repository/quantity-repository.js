var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');
var objectId =require('mongodb').ObjectId


module.exports={

  getAllQuantity:(productId)=>{
    return new Promise(async(resolve,reject)=>{
        // let quantity=await db.get().collection(collections.quantity_COLLECTION).find({$and:[{recordStatusId:1,productId:objectId(productId)}]}).toArray();
        // console.log("quantity ="+quantity)
        // resolve(quantity);

        let quantity=await db.get().collection(collections.quantity_COLLECTION).
        aggregate( [
                {
                    $match:{
                      $and:[{
                        recordStatusId:1,
                        productId:objectId(productId)
                      }]
                    }
                },
                {
                  
                  $lookup:
                    {
                      from: collections.size_COLLECTION,
                      localField: "size",
                      foreignField: "_id",
                      as: "test"
                    }
              }
            ] ).toArray();
            resolve(quantity);
    })
  },


  updateQuantity:(noSqlMode,productId,quantityDetails,adminId)=>{
    return new Promise(async(resolve,reject)=>{
      if(noSqlMode == 1){
        quantityDetails.size =objectId(quantityDetails.size) 
        quantityDetails.productId =objectId(productId) 
        quantityDetails.price = Number( quantityDetails.price);
        quantityDetails.offerprice = Number(quantityDetails.offerprice);
        quantityDetails.quantity = Number(quantityDetails.quantity);

        quantityDetails.cratedId =  objectId(adminId)
        quantityDetails.createdDate = new Date();
        quantityDetails.recordStatusId =1;
          db.get().collection(collections.quantity_COLLECTION).insertOne(quantityDetails).then((data)=>{
            resolve(data);
          })
      }
    })
   },

   deleteQuantity:(Id)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collections.quantity_COLLECTION).update({_id:objectId(Id)},{
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
