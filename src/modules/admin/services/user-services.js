const userRepository = require("../repository/user-repository")


module.exports={

    getUser:async(userId)=>{
      return await userRepository.getUser(userId)
    },

    getAllUsers:async()=>{
      return userRepository.getAllUsers()
    },

    updateUser:async(userId,userDetails,adminId)=>{
      let noSqlMode = 1

      if(userId != ""){
         noSqlMode = 2
      }
      return await userRepository.updateUser(noSqlMode,userId,userDetails,adminId)
   
     },

    deleteUser:async(userId)=>{
      return await userRepository.deleteUser(userId) 
    } ,

    changeStatus:async(userId,status)=>{
       return await userRepository.changeStatus(userId,status)
    },


}
