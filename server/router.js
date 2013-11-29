var reqUrlContr = require('./controllers/reqUrlController');
var resContr = require('./controllers/respondController');
var dbContr = require('./controllers/dbController');

var sendData = function (req, res) {
    var urlPath = reqUrlContr.readPath(req);
    var data = {};

    if (urlPath == '/get') {
        resContr.resJSON(res, data)
    }
    if (urlPath == '/') {
        resContr.resFile('./index.html', 'html', res)
    }
    if (urlPath == '/upload_project') {
        if(req.method.toLowerCase() === 'post'){
            dbContr.addProjectToDB(res,req);
            resContr.resFile('./backend.html', 'html', res)
        }
    }
    if (urlPath == '/upload_person') {
        if(req.method.toLowerCase() === 'post'){
            dbContr.addPersonToDB(res,req);
            resContr.resFile('./backend.html', 'html', res)
        }
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