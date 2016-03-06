function MainDao(Model) {
    this.Model = Model;
}
MainDao.prototype.create = function(obj,cb) {
    
    var model = new this.Model(obj);
    model.save(function(err){
        if(err==null) {
            cb.call(this,null,'success');
        }
        else {
          cb.call(this,err,null);
        }
    });
}
MainDao.prototype.fetchAll = function(obj,cb) {
    this.Model.find(obj,function(err,data){
        if(err == null) {
            cb.call(this,null,data);
        }
        else {
            cb.call(this,err,null);
        }
    });
}
module.exports = MainDao;
