const couponRepository = require("../repository/coupon-repository")


module.exports={

  
  getAllCoupon:async()=>{
    return couponRepository.getAllCoupon()
  },

  saveCoupon:async(couponDetails,adminId)=>{
    let noSqlMode = 1
    return await couponRepository.saveCoupon(noSqlMode,couponDetails,adminId)
  },


  deleteCoupon:async(couponId)=>{
    return await couponRepository.deleteCoupon(couponId)
  } 
}
