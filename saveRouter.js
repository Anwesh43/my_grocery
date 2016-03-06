var express = require('express');
var fs = require('fs');
var saveCallBack = function(res){
    return function(err,data){
        if(err== null) {
           res.send(data);
        }
        else {
          res.send(err);
        }
    }
};

module.exports = function(mongoConnector,upload) {
  var router = express.Router();
  router.post('/createItem',upload.single('itemImage'),function(req,res){
      var itemObj = req.body;
      itemObj.id = parseInt(itemObj.id);
      var file = req.file;
      console.log(file.originalname);
      itemObj.img = '/img/'.concat(file.originalname);
      fs.renameSync('./public/img/'+file.filename,'./public/img/'+file.originalname);
      mongoConnector.saveItem(itemObj,saveCallBack(res));
  });
  router.post('/createLink',function(req,res){
      mongoConnector.saveLink(req.body,saveCallBack(res));
  });
  router.post('/createCategory',function(req,res){
      mongoConnector.saveCategory(req.body,saveCallBack(res));
  });
  router.post('/createComboItem',function(req,res){
      mongoConnector.saveComboItem(req.body,saveCallBack(res));
  });
  return router;
}
