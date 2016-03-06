var mongoose = require('mongoose');
var linkSchema = mongoose.Schema({title:String,href:String});
var linkModel = mongoose.model('Link',linkSchema);
module.exports = linkModel;
