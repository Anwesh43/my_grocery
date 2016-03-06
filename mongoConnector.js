var mongoose = require('mongoose');
var mongooseConnector = Object.assign({});
var MainDao = require('./daos/MainDao.js');
var Link = require('./models/Link.js');
var Item = require('./models/Item.js');
var Category = require('./models/Category.js');
var ComboItem = require('./models/ComboItem.js');
var itemDao = new MainDao(Item);
var linkDao = new MainDao(Link);
var categoryDao = new MainDao(Category);
var comboDao = new MainDao(ComboItem);
mongooseConnector.connect = function(dbName) {
    mongoose.connect('localhost:27017/'.concat(dbName));
}
mongooseConnector.fetchItems = function(obj,cb) {
    itemDao.fetchAll(obj,cb);
}
mongooseConnector.fetchLinks = function(obj,cb) {
    linkDao.fetchAll(obj,cb);
}
mongooseConnector.fetchComboItem = function(obj,cb) {
    comboDao.fetchAll(obj,cb);
}
mongooseConnector.fetchCategory = function(obj,cb) {
    category.fetchAll(obj,cb);
}
mongooseConnector.saveItem = function(obj,cb) {
    itemDao.create(obj,cb);
}
mongooseConnector.saveLink = function(obj,cb) {
    linkDao.create(obj,cb);
}
mongooseConnector.saveCategory = function(obj,cb)  {
    categoryDao.create(obj,cb);
}
mongooseConnector.saveComboItem = function(obj,cb) {
    comboDao.create(obj,cb);
}
module.exports = mongooseConnector;
