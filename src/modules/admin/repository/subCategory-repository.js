var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');
var objectId =require('mongodb').ObjectId


module.exports={

 
   getSubCategory:(subCategoryId)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collections.sub_Category_COLLECTION).findOne({_id:objectId(subCategoryId)}).then((data)=>{
            resolve(data);
          })
    })
  },
  

   getAllSubCategorys:(categoryId)=>{
    return new Promise(async(resolve,reject)=>{
        let category=await db.get().collection(collections.sub_Category_COLLECTION).find({$and:[{recordStatusId:1,categoryId:objectId(categoryId)}]}).toArray();
        console.log("prodects ="+category)
        resolve(category);
    })
  },

  updateSubCategory:(noSqlMode,categoryId,subcategoryId,subcategoryDetails,adminId)=>{
      return new Promise(async(resolve,reject)=>{
        if(noSqlMode == 1){
        subcategoryDetails.categoryId =objectId(categoryId) 
        subcategoryDetails.cratedId = objectId(adminId) 
        subcategoryDetails.createdDate = new Date();
        subcategoryDetails.recordStatusId =1;
          db.get().collection(collections.sub_Category_COLLECTION).insertOne(subcategoryDetails).then((data)=>{
            resolve(data);
          })
        }
        else if(noSqlMode == 2){
            db.get().collection(collections.sub_Category_COLLECTION).update({_id:objectId(subcategoryId)},{
              $set:{
                  subCategoryName:subcategoryDetails.subCategoryName,
                  image:subcategoryDetails.image,
    
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
   
 

 deleteSubCategory:(categoryId)=>{
  return new Promise(async(resolve,reject)=>{
    db.get().collection(collections.sub_Category_COLLECTION).update({_id:objectId(categoryId)},{
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