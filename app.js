var express = require('express');
var app = express();
var path = require('path');
var dbStoreApp = express();
var mongoConnector = require('./mongoConnector.js');
var multer = require('multer');
var bodyParser = require('body-parser');
var dbName = "my_grocery_db";
if(process.argv.length == 4) {
    var dbName = process.argv[2].concat('_db');
    var portNumber = parseInt(process.argv[3]);
    mongoConnector.connect(dbName);
    var router = require('./router.js')(mongoConnector);
    var saveRouter = require('./saveRouter.js')(mongoConnector,multer({dest:'./public/img'}));
    app.use('/api',router);
    app.use(express.static(path.join(__dirname,'public')));
    dbStoreApp.use(bodyParser.json());
    dbStoreApp.use(bodyParser.urlencoded({extended:true}));
    dbStoreApp.use(express.static(path.join(__dirname,'dbStore')));
    dbStoreApp.use('/api',saveRouter);
    console.log("listening in port 8000");
    app.listen(portNumber);
    dbStoreApp.listen(portNumber+1);
}
