
const quantityRepository = require("../repository/quantity-repository")

module.exports={

  getAllQuantity:async(productId)=>{
      return await quantityRepository.getAllQuantity(productId)
  },


  updateQuantity:async(productId,quantityDetails,adminId)=>{

      let noSqlMode = 1

      // if(quantityId != ""){
      //   noSqlMode = 2
      // }
      return await quantityRepository.updateQuantity(noSqlMode,productId,quantityDetails,adminId)
  
   },

  deleteQuantity:async(Id)=>{
    return await quantityRepository.deleteQuantity(Id) 
  } 

}
