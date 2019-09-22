const fs = require("fs");
const TfWebServer = require("./web_server.js");
const TfSocketServer = require("./socket_server.js");
const TfTweetStream = require("./tweet_streem.js");

let config = JSON.parse(fs.readFileSync('./config.cfg'));

let tweetStream = new TfTweetStream();
let webserver = new TfWebServer(config.webserver.port);
let socketServer = new TfSocketServer();

socketServer.start(webserver.server, tweetStream);
webserver.start();
tweetStream.start(config.twitter_credentials, socketServer);

