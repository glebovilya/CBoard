var http = require('http');
var url = require('url');
var router = require('./router');
//var db = require('./db/dbShemas');
var dbsetter = require('./db/dataSetter');

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    router.respond(req, res, pathname);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

//dbsetter.addPerson(4, 'testName1', 'testSurname1', 'testPosition1', 'testPhotoPath1');
//dbsetter.addProject(0, 'testproject0');
//dbsetter.addStatus(1, 'testStatus');
//
//dbsetter.setCurrentPerson(1, true)
//dbsetter.setCurrentProject(0, true)

//dbsetter.addHistory(1, true)

dbsetter.getall();