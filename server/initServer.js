var http = require('http');
var url = require('url');
var router = require('./router');

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    router.respond(req, res, pathname);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');