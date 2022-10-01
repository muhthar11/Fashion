
const couponRepository = require("../repositories/coupon-repository")

module.exports={
  getCoupon:async(couponCode,userId)=>{
    return couponRepository.getCoupon(couponCode,userId)
  },

  getAllCoupons:async()=>{
    return couponRepository.getAllCoupons()
  },

  applayedUserStatus:(couponCode,userId,totalAmount)=>{
    return couponRepository.applayedUserStatus(couponCode,userId,totalAmount)
  },

  // getCouponUser:async(userId)=>{
  //   return couponRepository.getCouponUser(userId)
  // },
}