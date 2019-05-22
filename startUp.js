var express = require('express');
var ParseServer = require('./lib/index').ParseServer; // require('parse-server').ParseServer;

var HiResearchAuth = require('./lib/Adapters/Auth/HiResearch');

var api = new ParseServer({
  "appId":"hiresearch",
  "masterKey":"Hiresearch1",
  "javascriptKey":"jskey",
  "clientKey":"clientKey",
  "restAPIKey":"restKey",
  "databaseURI":"mongodb://172.16.164.85:27017/parse_xuzhe",
  "liveQuery":{
    "redisURL": 'redis://127.0.0.1:6379'
  },
  "jsonLogs": false,
  "allowClientClassCreation":true,
  "auth":{
    "hiresearchAuth": {
      "module": HiResearchAuth,
      "hiresearchHost": "172.16.164.79",
      "hiresearchPort": 8080
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
  "redisURL": 'redis://127.0.0.1:6379'
});
