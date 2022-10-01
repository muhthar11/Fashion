const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const bcrypt=require('bcrypt');
const objectId =require('mongodb').ObjectId

module.exports={
 
  getCoupon:(couponCode,userId)=>{
    return new Promise(async(resolve,reject)=>{
        let coupon=await db.get().collection(collections.COUPON_CALLECTION).aggregate([
          {
             $match:{
                      coupon:couponCode,
                      recordStatusId : 1
                    }
          },
          { 
            $unwind : "$applayedUsers"
          },
          {
            $match:{
                    'applayedUsers.userId':objectId(userId)
                   }
          }
          
        ]).toArray();
          console.log("coupon =",coupon[0])
          resolve(coupon);
          })
      },

 getAllCoupons:(userId)=>{
  return new Promise(async(resolve,reject)=>{
      let coupons=await db.get().collection(collections.COUPON_CALLECTION).find({ 
        $and:
            [
                {recordStatusId : 1}
            ]
        }).toArray();
      console.log("coupons ="+coupons)
      resolve(coupons);
      
        })
    },

    applayedUserStatus:(couponCode,userId,totalAmount)=>{
      return new Promise(async(resolve,reject)=>{
        let couponValidate=await db.get().collection(collections.COUPON_CALLECTION)
        .findOne(
                    {
                      coupon:couponCode
                    }
                );
        console.log("couponValidate =",couponValidate);
        console.log("couponValidate =",couponValidate);
        // console.log("couponValidate.expiryDate >= new Date() =",new Date().toLocaleDateString());
        // console.log("couponValidate.expiryDate >= new Date() =",couponValidate.expiryDate >= new Date().toLocaleDateString());

        console.log("couponValidate =",couponValidate.greaterThanPrice <= totalAmount);
        if(couponValidate.greaterThanPrice <= totalAmount){
            let coupon=await db.get().collection(collections.COUPON_CALLECTION).aggregate([
              {
                 $match:{
                          coupon:couponCode,
                          recordStatusId : 1
                        }
              },
              { 
                $unwind : "$applayedUsers"
              },
              {
                $match:{
                        'applayedUsers.userId':objectId(userId)
                       }
             }
              
            ]).toArray();
          console.log("coupon =",coupon[0])
          if(coupon[0]){
              reject("coupon Alrady Exist")
            }
            else{
              let applayedUserStatus= {};
              applayedUserStatus.userId =objectId(userId)
              applayedUserStatus.applayedDate=new Date().toDateString();
              applayedUserStatus.applayedStatus =true;
                console.log("userStatus==",applayedUserStatus)
                console.log("couponCode==",couponCode)
            
                db.get().collection(collections.COUPON_CALLECTION).updateOne({coupon:couponCode,recordStatusId:1},{
                    $push:{
                      "applayedUsers" :applayedUserStatus,
                    }
                }).then((response)=>{
                  console.log("response=",response)
                    resolve(coupon)
                })
          
            }
          }
          else{
            reject("Invalid")
          }
    
      })
    },
    

//  getCouponUser:(userId)=>{
//   return new Promise(async(resolve,reject)=>{
//     let couponUser=await db.get().collection(collections.COUPON_CALLECTION).aggregate([
//       { 
//         $unwind : "$applayedUsers"
//       },
//       {
//         $match:{
//                 'applayedUsers.userId':objectId(userId)
//                 }
//       }
      
//     ]).toArray();
//       console.log("couponUser =",couponUser[0])
//   //  resolve(couponUser);
//       })
//   },
   
}