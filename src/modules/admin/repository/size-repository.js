var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');
var objectId =require('mongodb').ObjectId


module.exports={

  getSize:(sizeId)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collections.size_COLLECTION).findOne({_id:objectId(sizeId)}).then((data)=>{
            resolve(data);
          })
    })
  },
  
  getAllSizes:()=>{
        return new Promise(async(resolve,reject)=>{
            let size=await db.get().collection(collections.size_COLLECTION).find({recordStatusId:1}).toArray();
            console.log("size ="+size)
            resolve(size);
          })
        },


   updateSize:(noSqlMode,sizeId,sizeDetails,adminId)=>{
      return new Promise(async(resolve,reject)=>{
        if(noSqlMode == 1){
          sizeDetails.createdId =objectId(adminId);
          sizeDetails.createdDate =new Date();
          sizeDetails.recordStatusId =1;
          db.get().collection(collections.size_COLLECTION).insertOne(sizeDetails).then((data)=>{
            resolve(data);
          })
        }
        else if(noSqlMode== 2){
             db.get().collection(collections.size_COLLECTION).update({_id:objectId(sizeId)},{
            $set:{
                size:sizeDetails.size,
                sizeShortFrom:sizeDetails.sizeShortFrom,
                
                modifiedId:objectId(adminId),
                modifiedDate:new Date(),
                recordStatusId : 1,
            }
            }).then((response)=>{
                resolve(response)
            })
        }
       
      })
   },

    deleteSize:(sizeId)=>{
          return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.size_COLLECTION).update({_id:objectId(sizeId)},{
                $set:{
                    recordStatusId : 3,
                }
            }).then((response)=>{
                resolve(response)
            })
          })
   } ,

   getCategoryName:()=>{
    return new Promise(async(resolve,reject)=>{
      let category = await db.get().collection(collections.category_COLLECTION).find().toArray();
      console.log("categoryName=",category);
      resolve(category);
    })
  } 

}
