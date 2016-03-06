var mongoose = require('mongoose');
var ComboItemSchema = mongoose.Schema({id:Number,items_id:Array,name:String,details:String,price:Number});
var ComboItem = mongoose.model('ComboItem',ComboItemSchema);
module.exports = ComboItem;
