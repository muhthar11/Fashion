
const wishlistRepository = require("../repositories/wishlist-repository")

module.exports={

  addWishlist:async(productId,cartDetails,userId,sizeId)=>{
    
    let noSqlMode = 1
    return await wishlistRepository.addWishlist(noSqlMode,productId,cartDetails,userId,sizeId)
  },

  getWishlist: async(userId)=>{
    return await wishlistRepository.getWishlist(userId)
  },
  
 deleteWishlist:async(wishlistId)=>{
    return await wishlistRepository.deleteWishlist(wishlistId)
 } 

}