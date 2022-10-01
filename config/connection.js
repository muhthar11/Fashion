const mongoClient = require('mongodb').MongoClient //connection 

const state={
    db:null
}

//conect Cheyan Vendi

module.exports.connect= function(done){
    const url ='mongodb://localhost:27017'
    const dbname='ecommerce'

    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)

        state.db=data.db(dbname)
        done()
    })
}

//connect Chytha database edukkan vendi

module.exports.get=function(){
    return state.db
}