var fs  = require('fs');
var formidable = require("formidable");

var resData = function (path, docType, res) {
    fs.readFile(path, function (err, content){
        if(err) {
            console.log(err);
            res.end()
        }
        else {
            res.writeHeader('Content-Type', 'text/' + docType + '; charset=utf-8');
            res.write(content);
            res.end();
        }
    })
};

var uploadfile = function(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log(files);
        fs.rename(files.upload.path, "./img/Persons/" + files.upload.name, function(err) {
            if (err) {
                console.log(err)
            }
        });
    });
}

var sendData = function (req, res, pathname) {
    if (pathname.pathname == '/') {
        resData('./index.html', 'html', res)
    }
    if (pathname.pathname == '/upload') {
        if(req.method.toLowerCase() === 'post'){
            console.log('upload')
            uploadfile(res,req)
        }
    }
    if (/^.*\.css$/.test(pathname.pathname)) {
        resData("." + pathname.pathname,'css', res)
    }
    if (/^.*\.js$/.test("." + pathname.pathname)) {
        resData(pathname.pathname,'javascript', res)
    }
    if (/^.*\.html$/.test("." + pathname.pathname)) {
        resData(pathname.pathname,'html', res)
    }
    if (/favicon.ico/.test("." + pathname.pathname)) {
        console.log('tried to load favicon')
    }


};

exports.respond = sendData;