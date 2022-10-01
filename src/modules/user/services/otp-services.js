
const otpRepository = require("../repositories/otp-validate-repository")

module.exports={

  getOtp: async(userDetails)=>{
    return await otpRepository.getOtp(userDetails)
  },
  verifyOtp: async(verifyOtp,userDetails)=>{
    return await otpRepository.verifyOtp(verifyOtp,userDetails)
  }
}