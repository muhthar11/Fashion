
const subCategoryRepository = require("../repositories/subCategory-repository")

module.exports={ 
  getAllSubCategorys:async(categoryId)=>{
    return await subCategoryRepository.getAllSubCategorys(categoryId)
  },

}