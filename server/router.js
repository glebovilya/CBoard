var reqUrlContr = require('./controllers/reqUrlController');
var resContr = require('./controllers/respondController');
var formContr = require('./controllers/postReqFormController');

var queryContr = require('./controllers/queryController');

var sendData = function (req, res) {
    var urlPath = reqUrlContr.readPath(req);

    if (urlPath == '/get') {
        queryContr.queryLogicController(req, res);
    }
    if (urlPath == '/') {
        resContr.resFile('./index.html', 'html', res)
    }
    if (urlPath == '/upload_project') {
        console.log('/upload_project');
        formContr.addProjectToDB(res,req);
    }
    if (urlPath == '/upload_person') {
        console.log('/upload_person');
        formContr.addPersonToDB(res,req);
    }
    if (/^.*\.css$/.test(urlPath)) {
        resContr.resFile("." + urlPath,'css', res)
    }
    if (/^.*\.js$/.test(urlPath)) {
        resContr.resFile(("." + urlPath),'javascript', res)
    }
    if (/^.*\.html$/.test(urlPath)) {
        resContr.resFile("." + urlPath,'html', res)
    }
    if (/^\/img\//.test(urlPath)) {
        resContr.resFile("." + urlPath,'image', res)
    }
    if (/favicon.ico/.test("." + urlPath)) {}

};

exports.respond = sendData;