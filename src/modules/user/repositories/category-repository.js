const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const objectId =require('mongodb').ObjectId


module.exports={


  
  getAllCategorys:()=>{
    return new Promise(async(resolve,reject)=>{
        let category=await db.get().collection(collections.category_COLLECTION).find({$and:[{recordStatusId:1,status:true}]}).toArray();
        console.log("category ="+category)
        resolve(category);
    })
  },

 

}