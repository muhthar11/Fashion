
const productRepository = require("../repositories/product-repository")

module.exports={

  getProducts:async()=>{
    return await productRepository.getProducts()
  },

  getCategoryProducts:async(categoryId)=>{
    return await productRepository.getCategoryProducts(categoryId)
  },

  getSubCategoryProducts:async(subCategoryId)=>{
    return await productRepository.getSubCategoryProducts(subCategoryId)
  },

  getSingleProduct:async(productId,userId)=>{
    return await productRepository.getSingleProduct(productId,userId)
  },
  // size
  getQuantity:async(sizeId,productId)=>{
    return await productRepository.getQuantity(sizeId,productId)
  }
}