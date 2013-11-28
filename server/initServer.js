var http = require('http');
var url = require('url');
var router = require('./router');
var dbsetter = require('./db/dataSetter');

http.createServer(function (req, res) {
    router.respond(req, res);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
