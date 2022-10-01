var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');
var objectId =require('mongodb').ObjectId


module.exports={

    getUser:(userId)=>{
      return new Promise(async(resolve,reject)=>{
          db.get().collection(collections.USER_COLLECTION).findOne({_id:objectId(userId)}).then((data)=>{
              resolve(data);
            })
      })
    },

    getAllUsers:()=>{
      return new Promise(async(resolve,reject)=>{
          let users=await db.get().collection(collections.USER_COLLECTION).find({recordStatusId:1}).toArray();
          console.log("prodects ="+users)
          resolve(users);
          })
        },

    updateUser:(noSqlMode,userId,userDetails,adminId)=>{
        return new Promise(async(resolve,reject)=>{
          if(noSqlMode == 2){
            db.get().collection(collections.USER_COLLECTION).update({_id:objectId(userId)},{
              $set:{
                  name:userDetails.name,
                  email:userDetails.email,
                  mobileNo:userDetails.mobileNo,
  
                  createdId:objectId(adminId),
                  modifiedDate:new Date(),
                  recordStatusId : 1,
              }
          }).then((response)=>{
              resolve(response)
          })
          }
        
        })
     },

    deleteUser:(userId)=>{
      return new Promise(async(resolve,reject)=>{
        db.get().collection(collections.USER_COLLECTION).update({_id:objectId(userId)},{
            $set:{
                recordStatusId : 3,
            }
        }).then((response)=>{
            resolve(response)
        })
      })
    } ,

    changeStatus:(userId,status)=>{
      return new Promise(async(resolve,reject)=>{
        console.log("status=",status)
        if(status=="true"){
            db.get().collection(collections.USER_COLLECTION).update({_id:objectId(userId)},{
                $set:{
                    status:false
                }
            }).then((response)=>{
                resolve(response)
            })
          }
          else{
            db.get().collection(collections.USER_COLLECTION).update({_id:objectId(userId)},{
                $set:{
                    status:true
                }
            }).then((response)=>{
                resolve(response)
            })
          }
      })
    },



}
