var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');
var objectId =require('mongodb').ObjectId


module.exports={

    
  getAllCoupon:()=>{
    return new Promise(async(resolve,reject)=>{
        let coupon=await db.get().collection(collections.COUPON_CALLECTION).find({recordStatusId:1}).toArray();
        console.log("coupon ="+coupon)
        resolve(coupon);
      })
    },

  saveCoupon:(noSqlMode,couponDetails,adminId)=>{
        return new Promise(async(resolve,reject)=>{
          if(noSqlMode == 1){
            couponDetails.greaterThanPrice=Number(couponDetails.greaterThanPrice);
            couponDetails.discountPrice=Number(couponDetails.discountPrice);
            couponDetails.startDate=couponDetails.startDate;
            couponDetails.expiryDate=couponDetails.expiryDate;
            couponDetails.applayedUsers=[];
            couponDetails.createdId =objectId(adminId);
            couponDetails.createdDate =new Date();
            couponDetails.recordStatusId =1;
            db.get().collection(collections.COUPON_CALLECTION).insertOne(couponDetails).then((data)=>{
               resolve(data);
            })
          }
         
        })
     },


     deleteCoupon:(couponId)=>{
      return new Promise(async(resolve,reject)=>{
        db.get().collection(collections.COUPON_CALLECTION).update({_id:objectId(couponId)},{
            $set:{
                recordStatusId : 3,
            }
        }).then((response)=>{
            resolve(response)
        })
      })
    } 
}
