
const subCategoryRepository = require("../repository/subCategory-repository")
const objectId =require('mongodb').ObjectId


module.exports={

   getSubCategory:async(subCategoryId)=>{
    return await subCategoryRepository.getSubCategory(subCategoryId)
  },
  

   getAllSubCategorys:async(categoryId)=>{
    return await subCategoryRepository.getAllSubCategorys(categoryId)
  },



  updateSubCategory:async(categoryId,subcategoryId,subcategoryDetails,adminId)=>{
    let noSqlMode = 1

     if(subcategoryId != ""){
        noSqlMode = 2
     }
     return await subCategoryRepository.updateSubCategory(noSqlMode,categoryId,subcategoryId,subcategoryDetails,adminId)
  
    },
 

  deleteSubCategory:async(categoryId)=>{
    return await subCategoryRepository.deleteSubCategory(categoryId) 
  } 

}