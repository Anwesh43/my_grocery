var express = require('express');
var fetchCallBack = function(res){
    return function(err,data){
        if(err== null) {
           res.send(data);
        }
        else {
          res.send({});
        }
    }
};

module.exports = function(mongoConnector) {
  var router = express.Router();
  router.get('/fetchItems',function(req,res){
      mongoConnector.fetchItems({},fetchCallBack(res));
  });
  router.get('/fetchLinks',function(req,res){
      mongoConnector.fetchLinks({},fetchCallBack(res));
  });
  return router;
}
