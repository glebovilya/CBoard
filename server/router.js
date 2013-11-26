var fs  = require('fs');

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

        console.log("parsing done");

        fs.rename(files.upload.path, "/tmp/test.png", function(err) {
            if (err) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

var sendData = function (req, res, pathname) {
    if (pathname == '/') {
        resData('./index.html', 'html', res)
    }
    if (/^.*\.css$/.test(pathname)) {
        resData("." + pathname,'css', res)
    }
    if (/^.*\.js$/.test("." + pathname)) {
        resData(pathname,'javascript', res)
    }
    if (/^.*\.html$/.test("." + pathname)) {
        resData(pathname,'html', res)
    }
    if (/favicon.ico/.test("." + pathname)) {
        console.log('tried to load favicon')
    }

};

exports.respond = sendData;