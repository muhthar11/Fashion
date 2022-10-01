
const addressRepository = require("../repositories/address-repository")

module.exports={

  
  updateAddress:async(addresId,addressDetails,userId)=>{

    let noSqlMode = 1

    if(addresId != ""){
       noSqlMode = 2
    }
    return await addressRepository.updateAddress(noSqlMode,addresId,addressDetails,userId)
 
   },

   getAllAddress:async(userId)=>{
    return addressRepository.getAllAddress(userId)
  },

  getAddress:async(addressId,userId)=>{
    return addressRepository.getAddress(addressId)
  },

}