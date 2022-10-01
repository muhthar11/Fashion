
const orderRepository = require("../repository/order-repository")

module.exports={

  getOrder:async(orderId)=>{
    return await orderRepository.getOrder(orderId)
  },

  getSingleOrder:async(orderId,productId)=>{
    return await orderRepository.getSingleOrder(orderId,productId)
  },
  
  getAllOrder:async()=>{
    return orderRepository.getAllOrder()
  },
 

  changeOrderStatus:async(orderId,productId,changeStatus)=>{
    return orderRepository.changeOrderStatus(orderId,productId,changeStatus)
  }
}