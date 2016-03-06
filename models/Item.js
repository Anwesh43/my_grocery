var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({id:Number,name:String,price:String,img:String,featured:Boolean,details:String,combo_item_id:Number,category_id:Number});
var itemModel = mongoose.model('Item',itemSchema);
module.exports = itemModel;
