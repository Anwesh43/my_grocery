var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema({id:Number,items_id:Array,name:String});
var Category = mongoose.model('Category',CategorySchema);
module.exports = Category;
