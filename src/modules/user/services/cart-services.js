
const cartRepository = require("../repositories/cart-repository")

module.exports={

  addCart:async(productId,cartDetails,userId,sizeId)=>{
    
    let noSqlMode = 1
    return await cartRepository.addCart(noSqlMode,productId,cartDetails,userId,sizeId)
  },

  getCart: async(userId)=>{
    return await cartRepository.getCart(userId)
  },
  
  deleteCart:async(cartId)=>{
      return await cartRepository.deleteCart(cartId)
  } ,

  count:async(productId,count,userId)=>{
    return await cartRepository.count(productId,count,userId)
  },



}