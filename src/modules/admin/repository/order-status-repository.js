let db = require('../../../../config/connection');
let collections = require('../../../../config/collections');
let objectId =require('mongodb').ObjectId


module.exports={


  getOrderStatus:async(orderId,productId)=>{
    return new Promise(async(resolve,reject)=>{
          let statusFromOrder=  await db.get().collection(collections.ORDER_CALLECTION).
        
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
                $project: {  "product.orderStatus.status": 1, _id: 0 } 
              }

              ] ).toArray();
              console.log("orderStatus123 ==",statusFromOrder)
         

            
              for(let i =0;i<statusFromOrder.length;i++){
                console.log("orders1 ==",statusFromOrder[i].product.orderStatus)
                orders = statusFromOrder[i].product.orderStatus
              }
               let statusFromOrder1 = orders.map((item) => {
                    return(item.status)
                    
                 })
              console.log("statusFromOrder1 ==",statusFromOrder1)

              let orderStatusCollection=await db.get().collection(collections.ORDER_STATUS_CALLECTION).find({recordStatusId:1}).toArray();

             
              let orderStatusCollections = orderStatusCollection.map((item) => {
                return(item.orderStatus);
              })
              console.log("orderStatusCollections =",orderStatusCollections)

             let orderStatus = orderStatusCollections.filter(function(obj) { return statusFromOrder1.indexOf(obj) == -1; });
              console.log("orderStatus:",orderStatus)
              resolve(orderStatus)
            }) 

  },

  
  getAllOrderStatus:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderStatus=await db.get().collection(collections.ORDER_STATUS_CALLECTION).find({recordStatusId:1}).toArray();
            console.log("OrderStatus ="+orderStatus)
            resolve(orderStatus);
          })
        },


   updateOrderStatus:(noSqlMode,orderStatusDetails,adminId)=>{
      return new Promise(async(resolve,reject)=>{
        if(noSqlMode == 1){
          orderStatusDetails.createdId =objectId(adminId);
          orderStatusDetails.createdDate =new Date();
          orderStatusDetails.recordStatusId =1;
          db.get().collection(collections.ORDER_STATUS_CALLECTION).insertOne(orderStatusDetails).then((data)=>{
            resolve(data);
          })
        }
       
      })
   },

    deleteOrderStatus:(orderStatusId)=>{
          return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.ORDER_STATUS_CALLECTION).update({_id:objectId(orderStatusId)},{
                $set:{
                    recordStatusId : 3,
                }
            }).then((response)=>{
                resolve(response)
            })
          })
   } 



}
