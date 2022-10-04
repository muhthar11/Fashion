var db = require('../../../../config/connection');
var collections = require('../../../../config/collections');

module.exports={
    
    adminLogin:(adminData)=>{
        return new Promise(async(resolve,rejrct)=>{
        let adminResponse ={};
        console.log("adminData=",adminData);
        let admin=await db.get().collection(collections.ADMIN_COLLECTION).findOne({$and:[{email:adminData.email , password:adminData.password}]})
        console.log("admin:",admin)
        if(admin){
            console.log("adminSuccess")
            adminResponse.admin=admin;
            adminResponse.status=true;
            resolve(adminResponse);
            }
        else{
            console.log("adminFeild")
            resolve({status:false});
        }
        })
    },

    getAllOrderStatus:()=>{
        return new Promise(async(resolve,reject)=>{
          let orderStatus=await db.get().collection(collections.ORDER_CALLECTION).
          aggregate( [
                  {
                    $unwind : "$product"
                  },
                  {
                    $project: {  "product.orderStatus.status": 1, _id: 0 } 
                  }
              ] ).toArray();
             // console.log("orderStatus ="+orderStatus)
              let count = [];
              let orderStatusCount ={};

              orderStatusCount.orderConfirmed =0;
              orderStatusCount.shipped =0;
              orderStatusCount.outForDelivery =0;
              orderStatusCount.delivered =0;
              orderStatusCount.cancelled =0;

              for(let i =0;i<orderStatus.length;i++){
                count = orderStatus[i].product.orderStatus.length-1
                console.log("orderStatus[i].paymentType ==",orderStatus[i])
                console.log("orderStatus ==",orderStatus[i].product.orderStatus[count].status)
                if(orderStatus[i].product.orderStatus[count].status =='Order Confirmed'){
                    orderStatusCount.orderConfirmed += 1
                }
                else if(orderStatus[i].product.orderStatus[count].status == 'Shipped'){
                    orderStatusCount.shipped += 1;
                }else if(orderStatus[i].product.orderStatus[count].status == 'Out For Delivery'){
                    orderStatusCount.outForDelivery += 1;
                }
                else if(orderStatus[i].product.orderStatus[count].status == 'Delivered'){
                    orderStatusCount.delivered += 1;
                }
                else if(orderStatus[i].product.orderStatus[count].status == 'Cancelled'){
                    orderStatusCount.cancelled += 1;
                }
              }
              
              console.log("orderStatusCount ==",orderStatusCount)
               resolve(orderStatusCount);
        })
      },

      getAllPaymentStatus:()=>{
        return new Promise(async(resolve,reject)=>{
          let orderPaymentStatus=await db.get().collection(collections.ORDER_CALLECTION).find({recordStatusId:1}).toArray()
          let paymentStatusCount = {}
          paymentStatusCount.upi = 0;
          paymentStatusCount.cash =0;
          for(let i=0;i<orderPaymentStatus.length;i++){
            console.log("coupon ="+orderPaymentStatus[i].paymentType)
             if(orderPaymentStatus[i].paymentType=="Cash On Delivery"){
                paymentStatusCount.cash += 1;
             }else if(orderPaymentStatus[i].paymentType=="UPI"){
                paymentStatusCount.upi += 1;
             }
          }
          console.log("paymentStatusCount =",paymentStatusCount)
            resolve(paymentStatusCount);
        })
      },

     ///category wised
     
      getAllDeliveryStatus:()=>{
        return new Promise(async(resolve,reject)=>{
          let orderDelivery=await db.get().collection(collections.ORDER_CALLECTION).
          aggregate( [
            {
              $unwind : "$product"
            },
            // {
            //   $project: {  "product.orderStatus.status": 1,"product.productId":1 ,_id: 0 } 
            // },
            {
              $match: {  "product.orderStatus.status": "Delivered" } 
            },
            {
            $lookup:
              {
                  from: collections.PRODUCT_COLLECTION,
                  localField: "product.productId",
                  foreignField: "_id",
                  as: "singleProduct"
              }
            },
            {
              $lookup:
                {
                    from: collections.category_COLLECTION,
                    localField: "singleProduct.category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
              $match: {"category.recordStatusId": 1} 
            },
            {
              $project: {  "category.categoryName": 1,"singleProduct._id": 1,"singleProduct.offerPrice": 1} 
            },
         ] ).toArray();
          console.log("orderDelivery =",orderDelivery)
          let orderDeliveryStatus={}
          orderDeliveryStatus.totalDeliveryPrice = 0;
          orderDeliveryStatus.menCount = 0;
          orderDeliveryStatus.womenCount = 0;
          orderDeliveryStatus.kidsCount = 0;
          for(let i=0;i<orderDelivery.length;i++){
              console.log("welcome category==",orderDelivery[i].singleProduct[0].offerPrice)
              console.log("welcome category==",orderDelivery[i].category[0].categoryName)

             
              orderDeliveryStatus.totalDeliveryPrice += Number(orderDelivery[i].singleProduct[0].offerPrice);

              if(orderDelivery[i].category[0].categoryName == "Men"){
                orderDeliveryStatus.menCount += 1;
              }
              else if(orderDelivery[i].category[0].categoryName == "Women"){
                orderDeliveryStatus.womenCount += 1;
              }else if(orderDelivery[i].category[0].categoryName == "Kids"){
                orderDeliveryStatus.kidsCount += 1;
              }
          }
          console.log("orderDeliveryStatus",orderDeliveryStatus)
          resolve(orderDeliveryStatus)
        })
      },
}