const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const bcrypt=require('bcrypt');
const objectId =require('mongodb').ObjectId

module.exports={
    
  updateAddress:(noSqlMode,addresId,addressDetails,userId)=>{
    return new Promise(async(resolve,reject)=>{
      if(noSqlMode==1){
          addressDetails.phoneNumber = Number( addressDetails.phoneNumber),
          addressDetails.pincode = Number( addressDetails.pincode),
          addressDetails.userId =objectId(userId),
          addressDetails.createdId = objectId(userId),
          addressDetails.createdDate = new Date();
          addressDetails.recordStatusId = 1;
          console.log("muhthar==",addressDetails)
            db.get().collection(collections.ADDRESS_CALLECTION).insertOne(addressDetails)
            .then((data)=>{
              resolve(data)
            })
      }
      else if(noSqlMode==2){
        db.get().collection(collections.ADDRESS_CALLECTION).update({_id:objectId(addresId)},{
          $set:{
              firstName:addressDetails.firstName,
              lastName:addressDetails.lastName,
              roadName:addressDetails.roadName,
              phoneNumber : Number(addressDetails.phoneNumber),
              houseName:addressDetails.houseName,
              district:addressDetails.district,
              state:addressDetails.state,
              pincode : Number(addressDetails.pincode),
              additionalInformation:addressDetails.additionalInformation,
              userId:  objectId(userId),

              modifiedId:  objectId(userId),
              modifiedDate:new Date(),
              recordStatusId : 1,
          }
          }).then((response)=>{
              resolve(response)
          })
      }

    })
 },

 getAllAddress:(userId)=>{
  return new Promise(async(resolve,reject)=>{
      let address=await db.get().collection(collections.ADDRESS_CALLECTION).find({ 
        $and:
            [
                {userId:objectId(userId),recordStatusId : 1}
            ]
        }).toArray();
      console.log("address ="+address)
      resolve(address);
      
        })
      },
    
  getAddress:(addressId)=>{
    return new Promise(async(resolve,reject)=>{
      db.get().collection(collections.ADDRESS_CALLECTION).findOne({_id:objectId(addressId)}).then((data)=>{
      resolve(data);
        
      })
    })
  }
   
}