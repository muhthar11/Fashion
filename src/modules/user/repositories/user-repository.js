const db = require('../../../../config/connection');
const collections = require('../../../../config/collections');
const bcrypt=require('bcrypt');
const objectId =require('mongodb').ObjectId

module.exports={
    
    userSignUp:(userData)=>{
        return new Promise(async(resolve,reject)=>{
                let email=await db.get().collection(collections.USER_COLLECTION).findOne({$and:[{email:userData.email ,recordStatusId : 1}]});
                console.log("email =",email)
                if(email){
                    reject("Email Alrady Exist")
                }
                else{
                    userData.password=await bcrypt.hash(userData.password,10)
                    userData.status = true;
                    userData.recordStatusId =1;
                    db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data)=>{
                        console.log("success")
                    resolve(data);
                    })
                }
        })
    },

    userLogin:(userData)=>{
        return new Promise(async(resolve,rejrct)=>{
        let loginStates =false;
        let response ={};
        console.log("userdata=",userData)
        let user=await db.get().collection(collections.USER_COLLECTION).findOne({mobileNo:userData.mobileNo})
        console.log("user:",user)
        if(user){
            bcrypt.compare(userData.password,user.password).then((status)=>{
                if(status){
                    console.log("success")
                    response.user=user;
                    response.status=true;
                    resolve(response);
                }else{
                    console.log("feild1")
                    resolve({status:false});
                }
            })
        }else{
            console.log("feild2")
            resolve({status:false});
        }
        })
    },

    
    getUser:(user)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.USER_COLLECTION).findOne({_id:objectId(user)}).then((user)=>{
                resolve(user);
            })
        })
    },

    updateUser:(userData,userId)=>{
        return new Promise(async(resolve,reject)=>{
                // let email=await db.get().collection(collections.USER_COLLECTION).findOne({$and:[{email:userData.email ,recordStatusId : 1}]});
                // console.log("email =",email)
                // if(email){
                //     reject("Email Alrady Exist")
                // }
                // else{
                    db.get().collection(collections.USER_COLLECTION).update({_id:objectId(userId)},{
                        $set:{
                            name:userData.name,
                            email:userData.email,
                            mobileNo:userData.mobileNo
                        }
                    }).then((response)=>{
                        resolve(response)
                    })
                // }
        })
    },
}