
const categoryRepository = require("../repository/category-repository")

module.exports={

  getCategory:async (categoryId)=>{
    return await categoryRepository.getCategory(categoryId)
  },
  
  getAllCategorys:async()=>{
    return categoryRepository.getAllCategorys()
  },



   updateCategory:async(categoryId,categoryDetails,adminId)=>{

     let noSqlMode = 1

     if(categoryId != ""){
        noSqlMode = 2
     }
     return await categoryRepository.updateCategory(noSqlMode,categoryId,categoryDetails,adminId)
  
    },

    deleteCategory:async(categoryId)=>{
        return await categoryRepository.deleteCategory(categoryId) 
    } ,

    changeStatus: async(categoryId,status)=>{
         return await categoryRepository.changeStatus(categoryId,status)
     }

}