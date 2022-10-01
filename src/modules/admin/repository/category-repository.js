var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');
var objectId =require('mongodb').ObjectId


module.exports={

  getCategory:(categoryId)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collections.category_COLLECTION).findOne({_id:objectId(categoryId)}).then((data)=>{
            resolve(data);
          })
    })
  },
  
  getAllCategorys:()=>{
    return new Promise(async(resolve,reject)=>{
        let category=await db.get().collection(collections.category_COLLECTION).find({recordStatusId:1}).toArray();
        console.log("prodects ="+category)
        resolve(category);
    })
  },



   updateCategory:(noSqlMode,categoryId,categoryDetails,adminId)=>{
      return new Promise(async(resolve,reject)=>{
        if(noSqlMode==1){
            categoryDetails.status = false;
            categoryDetails.createdId = objectId(adminId),
            categoryDetails.createdDate = new Date();
            categoryDetails.recordStatusId = 1;
            console.log("muhthar==",categoryDetails)
              db.get().collection(collections.category_COLLECTION).insertOne(categoryDetails)
              .then((data)=>{
                resolve(data)
              })
        }
        else if(noSqlMode==2){
          db.get().collection(collections.category_COLLECTION).update({_id:objectId(categoryId)},{
            $set:{
                categoryName:categoryDetails.categoryName,
                image:categoryDetails.image,

                modifiedId: objectId(adminId),
                modifiedDate:new Date(),
                recordStatusId : 1,
            }
            }).then((response)=>{
                resolve(response)
            })
        }

      })
   },

    deleteCategory:(categoryId)=>{
          return new Promise(async(resolve,reject)=>{
           let data = await db.get().collection(collections.PRODUCT_COLLECTION).find({$and:[{recordStatusId:1,category:objectId(categoryId)}]}).toArray();
            console.log("data =",data[0])
            if(data[0] == undefined){
              console.log("welcome Undifind")
              db.get().collection(collections.category_COLLECTION).update({_id:objectId(categoryId)},{
                $set:{
                    modifydate : new Date(),
                    recordStatusId : 3,
                 }
                }).then((response)=>{
                    resolve(response)
                })
            }
            else{
              console.log("welcome Not Undifind")
              let err = "This category not delete becouse product available"
              resolve(err)
            }
         
           })
   } ,


changeStatus:(categoryId,status)=>{
  return new Promise(async(resolve,reject)=>{
     if(status=="true"){
        db.get().collection(collections.category_COLLECTION).update({_id:objectId(categoryId)},{
            $set:{
                status:false
            }
        }).then((response)=>{
            resolve(response)
        })
      }
      else{
        db.get().collection(collections.category_COLLECTION).update({_id:objectId(categoryId)},{
            $set:{
                status:true
            }
        }).then((response)=>{
            resolve(response)
        })
      }
   })
 }

}