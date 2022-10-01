var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');
var objectId =require('mongodb').ObjectId


module.exports={

  getOrder:(orderId)=>{
    return new Promise(async(resolve,reject)=>{
        console.log("orderId=",orderId)
        let order=await db.get().collection(collections.ORDER_CALLECTION).
        aggregate( [
          
            {
                $match:
                {
                    _id:objectId(orderId),
                    recordStatusId : 1
                }
            },
            { 
              $unwind : "$product"
            },
            {
              $lookup:
                  {
                      from: collections.PRODUCT_COLLECTION,
                      localField: "product.productId",
                      foreignField: "_id",
                      as: "singleProdect"
                  }
            },
            ]).toArray();

            resolve(order);
     })
},

getSingleOrder:(orderId,productId)=>{
  return new Promise(async(resolve,reject)=>{
      console.log("productId=",productId)
      let order=await db.get().collection(collections.ORDER_CALLECTION).
      aggregate( [
          { 
            $unwind : "$product"
          },
          {
              $match:
              {
                  _id:objectId(orderId),
                  "product.productId":objectId(productId),
                  recordStatusId : 1
              }
          },
          {
            $lookup:
                {
                    from: collections.ADDRESS_CALLECTION,
                    localField: "addressId",
                    foreignField: "_id",
                    as: "address"
                }
          },
          {
            $lookup:
                {
                    from: collections.PRODUCT_COLLECTION,
                    localField: "product.productId",
                    foreignField: "_id",
                    as: "singleProdect"
                }
          }
          ] ).toArray();

          resolve(order);
   })
},

  
  getAllOrder:()=>{
    return new Promise(async(resolve,reject)=>{
      let order=await db.get().collection(collections.ORDER_CALLECTION).
      aggregate( [
              {
                  $match:{ recordStatusId : 1 }
              },
              {
                  $lookup:
                      {
                          from: collections.PRODUCT_COLLECTION,
                          localField: "product.productId",
                          foreignField: "_id",
                          as: "singleProdect"
                      }
              },
              {
                $lookup:
                    {
                        from: collections.USER_COLLECTION,
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
            }
          ] ).toArray();
          console.log("order ="+order)
          resolve(order);
    })
  },


  
  changeOrderStatus:(orderId,productId,changeStatus)=>{
    return new Promise(async(resolve,reject)=>{
      changeStatus.date=new Date().toDateString();
      changeStatus.productId =objectId(productId)
      changeStatus.orderId =objectId(changeStatus.orderId)
        console.log("changeStatus==",changeStatus)
        db.get().collection(collections.ORDER_CALLECTION).update({_id:objectId(orderId),"product.productId":objectId(productId)},{
            $push:{
              "product.$.orderStatus":changeStatus ,
            },
        }).then((response)=>{
            resolve(response)
        })
      })
  },


}