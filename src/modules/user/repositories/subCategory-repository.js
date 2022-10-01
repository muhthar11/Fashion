const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const objectId =require('mongodb').ObjectId


module.exports={
  
  getAllSubCategorys:(categoryId)=>{
    return new Promise(async(resolve,reject)=>{
        let subCategory=await db.get().collection(collections.sub_Category_COLLECTION).find({$and:[{recordStatusId:1,categoryId:objectId(categoryId)}]}).toArray();
        console.log("sub category ="+subCategory)
        resolve(subCategory);
    })
  },

}