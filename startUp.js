var express = require('express');
var ParseServer = require('./lib/index').ParseServer; // require('parse-server').ParseServer;

var api = new ParseServer({
  "appId":"hiresearch",
  "masterKey":"Hiresearch1",
  "databaseURI":"mongodb://172.16.164.85:27017/parse"
  //"liveQuery":{
  //  classNames: ['Address']
  //}
});

var app = express();

// make the Parse Server available at /parse
app.use('/parse', api);

var httpServer = require('http').createServer(app);
httpServer.listen(1337, function() {
  console.log("running on port 1337");
});

ParseServer.createLiveQueryServer(httpServer);
