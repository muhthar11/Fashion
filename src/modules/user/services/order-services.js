
const orderRepository = require("../repositories/order-repository")

 module.exports={

  getOrder:async(orderId,userId)=>{
    console.log("welcome order controll services")
    return await orderRepository.getOrder(orderId,userId)
  },

  getAllOrder:async(userId)=>{
    console.log("welcome order controll services")
    return await orderRepository.getAllOrder(userId)
  },

  saveOrder:async(orderDetails,userId)=>{
      let noSqlMode = 1
      return await orderRepository.saveOrder(noSqlMode,orderDetails,userId)
    },

  deleteOrder:async(orderId,productId)=>{
      return await orderRepository.deleteOrder(orderId,productId)
  } ,

  generateRazorpay:async(orderId,orderDetails)=>{
    return await orderRepository.generateRazorpay(orderId,orderDetails)
  } ,

  verifyPayment:async(details)=>{
    return await orderRepository.verifyPayment(details)
  },

  changePaymentStatus:async(orderId,userId)=>{
    return await orderRepository.changePaymentStatus(orderId,userId)
  }

}