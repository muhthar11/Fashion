const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const bcrypt=require('bcrypt');
const objectId =require('mongodb').ObjectId;
const Razorpay = require('razorpay');
const { format } = require('path');
// var instance = new Razorpay({ key_id: 'rzp_test_0iqaZqJFZvwqzX',key_secret: 'eZVc3fvV3vwPRsJ881akW3e8', });
var instance = new Razorpay({ key_id: process.env.key_id,key_secret: process.env.key_secret, });

module.exports={


    
    getOrder:(orderId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            console.log("productId=",productId)
            let order=await db.get().collection(collections.ORDER_CALLECTION).
            aggregate( [
              
                {
                    $match:{
                        $and:
                        [
                            {
                                _id:objectId(orderId),
                                userId:objectId(userId),
                                recordStatusId : 1
                            }
                        ]
                    }
                },
                {
                $lookup:
                    {
                        from: collections.ADDRESS_CALLECTION,
                        localField: "addressId",
                        foreignField: "_id",
                        as: "address"
                    }
                 },
                 { 
                    $unwind : "$product"
                 },
                 {
                    $lookup:
                        {
                            from: collections.PRODUCT_COLLECTION,
                            localField: "product.productId",
                            foreignField: "_id",
                            as: "singleProdect"
                        }
                }
                ] ).toArray();

                resolve(order);
         })
    },


    getAllOrder:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let order=await db.get().collection(collections.ORDER_CALLECTION).
            aggregate( [
                    {
                        $match:{
                            $and:
                            [
                                {
                                    userId:objectId(userId),
                                    recordStatusId : 1
                                }
                            ]
                        }
                    },
                    // { 
                    //     $unwind : "$product"
                    // },
                    {
                        $lookup:
                            {
                                from: collections.PRODUCT_COLLECTION,
                                localField: "product.productId",
                                foreignField: "_id",
                                as: "singleProdect"
                            }
                    }
                ] ).toArray();
                console.log("order ="+order)
                resolve(order);
         })
    },
    
    saveOrder:(noSqlMode,orderDetails,userId)=>{
        return new Promise(async(resolve,reject)=>{
          if(noSqlMode==1){


              let cart=await db.get().collection(collections.CART_CALLECTION)
                .find({ 
                        $and:
                            [
                                {userId:objectId(userId),recordStatusId : 1}
                            ]
                        })
                .project({  
                            _id:0,
                            productId:1,
                            productCount:1,
                            price:1,
                            offerprice:1 ,
                            orderStatus:[
                                            {
                                              status:'Order Confirmed',
                                              date: new Date().toDateString()
                                            }
                                        ]
                        })
                .toArray();
                
                console.log("cart save order =",cart)
                console.log("orderDetails.couponAmount =",orderDetails.couponAmount)

              //invoice id        
                const getRandomId = (min = 0, max = 500000) => {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    const num =  Math.floor(Math.random() * (max - min + 1)) + min;
                    return num.toString().padStart(6, "0")
                };

                orderDetails.invoiceId =Number(getRandomId())
                orderDetails.addressId= objectId(orderDetails.addressId)
                orderDetails.date = new Date();
                orderDetails.product = cart ;
                orderDetails.userId = objectId(userId);
                orderDetails.orginalAmount= Number(orderDetails.orginalAmount)  
                orderDetails.saveAmount= Number(orderDetails.saveAmount)
                if(orderDetails.couponAmount){
                    orderDetails.couponAmount= Number(orderDetails.couponAmount)
                }
                orderDetails.payAmount= Number(orderDetails.payAmount)
                orderDetails.paymentStatus = orderDetails.paymentType==='Cash On Delivery'?'pending':'paymentProcess'

                orderDetails.createdDate =new Date();
                orderDetails.recordStatusId = 1; 
                console.log("orderDeteails save order == ",orderDetails)

                db.get().collection(collections.ORDER_CALLECTION).insertOne(orderDetails).then((data)=>{
                    console.log("orderDetails.paymentType===",orderDetails.paymentType)
                    if( orderDetails.paymentType==='Cash On Delivery'){
                          db.get().collection(collections.CART_CALLECTION).remove({userId:objectId(userId)}).then(()=>{
                            resolve(data);
                           })
                    }
                    else resolve(data);
                })
           }
           
        })  
     },

     deleteOrder:(orderId,productId)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(productId)
            let changeStatus = {}
            changeStatus.status="Cancelled",
            changeStatus.date=new Date().toDateString();
            db.get().collection(collections.ORDER_CALLECTION).update({_id:objectId(orderId),"product.productId":objectId(productId)},{
                $push:{
                    "product.$.orderStatus" : changeStatus,
                }
            }).then((response)=>{
                resolve(response)
            })
            })
    },

    generateRazorpay:(orderId,orderDetails)=>{
        console.log("welcome Razorpay")
        console.log("welcome orderId= ",    )
        console.log("welcome orderDetails =",orderDetails)
        return new Promise(async(resolve,reject)=>{
            instance.orders.create({
                amount:Number(orderDetails.payAmount)*100,
                currency: "INR",
                receipt: ""+orderId,
                notes: {
                  key1: "value3",
                  key2: "value2"
                },
              },
              function(err,order){
                resolve(order)
              })
              
        })
    },

    verifyPayment:(details)=>{
        return new Promise(async(resolve,reject)=>{
            const crypto = require('crypto');
            let hmac = crypto.createHmac('sha256','eZVc3fvV3vwPRsJ881akW3e8')
            hmac.update(details['payment[razorpay_order_id]']+'|'+details['payment[razorpay_payment_id]'])
            hmac=hmac.digest('hex')
            if(hmac==details['payment[razorpay_signature]']){
                resolve()
            }else{
                reject()
            }
        })
    },
    
    changePaymentStatus:(orderId,userId)=>{
        return new Promise(async(resolve,reject)=>{
            console.log("orderId==",orderId)
            db.get().collection(collections.ORDER_CALLECTION).update({_id:objectId(orderId)},{
              $set:{
                paymentStatus:"success"
              }
          }).then((response)=>{
              db.get().collection(collections.CART_CALLECTION).remove({userId:objectId(userId)}).then(()=>{
                  resolve(response)
              })
          })
        })
    },
}