var express = require('express');
var ParseServer = require('./lib/index').ParseServer; // require('parse-server').ParseServer;

var HiResearchAuth = require('./lib/Adapters/Auth/HiResearch');

var api = new ParseServer({
  "appId":"hiresearch",
  "masterKey":"Hiresearch1",
  "javascriptKey":"jskey",
  "databaseURI":"mongodb://172.16.164.85:27017/parse",
  "liveQuery":{
    "redisURL": 'redis://172.16.164.85:6379'
  },
  "cloud":"./cloud/main.js",
  "allowClientClassCreation":true,
  "auth":{
    "hiresearchAuth": {
      "module": HiResearchAuth
    }
  }
});

var app = express();

// make the Parse Server available at /parse
app.use('/parse', api);

var httpServer = require('http').createServer(app);
httpServer.listen(1337, function() {
  console.log("running on port 1337");
});

// start live query server
ParseServer.createLiveQueryServer(httpServer, {
  "redisURL": 'redis://172.16.164.85:6379'
});
