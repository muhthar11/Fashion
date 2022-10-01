const loginRepository = require("../repository/login-repository")

module.exports={
    
    adminLogin:async(adminData)=>{
        return await loginRepository.adminLogin(adminData)
    },

    getAllOrderStatus:async()=>{
        return loginRepository.getAllOrderStatus()
    },

    getAllPaymentStatus:async()=>{
    return loginRepository.getAllPaymentStatus()
    }
}