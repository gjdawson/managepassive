const express = require('express');
//const app = require('express')();
const path = require('path');


var app = express();


app.use(function(req, res, next){
    if(path.extname(req.path).length < 1) {
        req.url = '/index.html';
    }
    next();
});
app.use(express.static(path.join(__dirname, '../client/public')));


var port=8082;

app.listen(port,function() {
    console.log('Listening on port ' + port);
});