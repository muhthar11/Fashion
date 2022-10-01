const orderStatusRepository = require("../repository/order-status-repository")


module.exports={

  
  getAllOrderStatus:async()=>{
    return orderStatusRepository.getAllOrderStatus()
  },

  updateOrderStatus:async(orderStatusDetails,adminId)=>{

    let noSqlMode = 1
    return await orderStatusRepository.updateOrderStatus(noSqlMode,orderStatusDetails,adminId)
 
   },

   getOrderStatus:async(orderId,productId)=>{
    return orderStatusRepository.getOrderStatus(orderId,productId)
  },


   deleteOrderStatus:async(orderStatusId)=>{
      return await orderStatusRepository.deleteOrderStatus(orderStatusId) 
   } 
}
