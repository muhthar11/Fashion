
const productRepository = require("../repository/product-repository")


module.exports={

  getProduct:async(productId)=>{
    return await productRepository.getProduct(productId)
  },
  
  getAllProducts:async()=>{
    return productRepository.getAllProducts()
  },


  updateProduct:async(productId,productDetails,adminId)=>{
      let noSqlMode = 1

      if(productId != ""){
        noSqlMode = 2
      }
      return await productRepository.updateProduct(noSqlMode,productId,productDetails,adminId)
  
  },

  deleteProduct:async(productId)=>{
      return await productRepository.deleteProduct(productId)
  } ,

  changeStatus:async(productId,status)=>{
      return await productRepository.changeStatus(productId,status)
  },

   getCategoryName:async()=>{
    return await productRepository.getCategoryName()
   }


}
