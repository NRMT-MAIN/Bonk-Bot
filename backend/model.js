const mongoose = require("mongoose") ;
const { DATABASE_URL } = require("./config");


try{
    mongoose.connect(DATABASE_URL)
    console.log("Database Connected")
} catch( err ){
    console.log( err )
}


const UserSchema = mongoose.Schema({
    username  : String ,
    password : String ,
    privateKey : String ,
    publicKey : String
})

const userModel = mongoose.model("users" , UserSchema ) ;

module.exports = {
    userModel
}