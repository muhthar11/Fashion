
const categoryRepository = require("../repositories/category-repository")

module.exports={

  getAllCategorys:async()=>{
    return await categoryRepository.getAllCategorys()
  },

}