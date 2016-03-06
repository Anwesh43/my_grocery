var mongoose = require('mongoose');
var validMobile = function(number) {
   return number >= 7*Math.pow(10,9) && number <  Math.pow(10,10);
}
var userSchema = mongoose.Schema({id:Number,name:String,email:{
  type:String
  required:'Email id is required',
  unique:true,
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
},mobileno:{
  type:Number,
  required:'Mobile number is required'
  unique:true,
  validate:[validMobile,"Must be a valid mobile number"]
},password:{type:String,unique:true});

var userModel = mongoose.model('User',userSchema);
module.exports = userModel;
