const mongoose = require('mongoose') ;
const schemaUserModel = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , 'the name field is required'] ,
    } ,

    email : {
        type : String ,
        required : [true , 'the email field is required'] ,
    } ,

    password : {
        type : String , 
        required : [true , 'the password field is required'] ,
    }
}) ;

const userModel = mongoose.model('users' , schemaUserModel) ;
module.exports = userModel ;
