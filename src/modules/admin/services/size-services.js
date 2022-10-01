const sizeRepository = require("../repository/size-repository")


module.exports={

  getSize:async(sizeId)=>{
    return await sizeRepository.getSize(sizeId)
  },
  
  getAllSizes:async()=>{
    return sizeRepository.getAllSizes()
  },

  updateSize:async(sizeId,sizeDetails,adminId)=>{

    let noSqlMode = 1

    if(sizeId != ""){
       noSqlMode = 2
    }
    return await sizeRepository.updateSize(noSqlMode,sizeId,sizeDetails,adminId)
 
   },


    deleteSize:async(sizeId)=>{
      return await sizeRepository.deleteSize(sizeId) 
   } ,

   getCategoryName:async()=>{
    return await sizeRepository.getCategoryName()
   }

}
