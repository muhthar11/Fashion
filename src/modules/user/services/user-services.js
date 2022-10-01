const userRepository = require("../repositories/user-repository")

module.exports={
    userSignUp:async(userData)=>{
        return await userRepository.userSignUp(userData)
    },

    userLogin:async(userData)=>{
        return await userRepository.userLogin(userData)
    },

    getUser:async(user)=>{
        return await userRepository.getUser(user)
    },

    updateUser:async(userData,userId)=>{
        return await userRepository.updateUser(userData,userId)
    },
}