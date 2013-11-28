var fs  = require('fs');
var formidable = require("formidable");
var dataSetter = require('./db/dataSetter');

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

var addProjectToDB = function(response, request) {
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields) {
        dataSetter.getall();
        dataSetter.addProject(fields.name, fields.date);
    });
}

var addPersonToDB = function(response, request) {
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.rename(files['photo'].path, "./img/Persons/" + files['photo'].name, function(err) {
            if (err) {
                console.log(err)
            }
            else {
                dataSetter.addPerson(fields.name, fields.surname, fields.position, ("./img/Persons/" + files['photo'].name))
            }
        });

        dataSetter.getall();

    });
}

var sendData = function (req, res, pathname) {

    if (pathname.pathname == '/get') {
        res.writeHeader(200,{
//            'Location': '/backend.html',
            'Content-Type': 'application/json'
        })
        console.log(require('url').parse(pathname.path, true).query)
//        data = {id: 1, name: 'name'};
        res.end(JSON.stringify({data:{id:'longstring',name:"Vasya", surname:"Pupkin", email:'testuser@captusr.com', photo:'img/45'}}))
    }
    if (pathname.pathname == '/') {
        resData('./index.html', 'html', res)
    }
    if (pathname.pathname == '/upload_project') {
        if(req.method.toLowerCase() === 'post'){
            addProjectToDB(res,req);
            resData('./backend.html', 'html', res)
        }
    }
    if (pathname.pathname == '/upload_person') {
        if(req.method.toLowerCase() === 'post'){
            addPersonToDB(res,req);
            resData('./backend.html', 'html', res)
        }
    }
    if (/^.*\.css$/.test(pathname.pathname)) {
        resData("." + pathname.pathname,'css', res)
    }
    if (/^.*\.js$/.test(pathname.pathname)) {
        resData(("." + pathname.pathname),'javascript', res)
    }
    if (/^.*\.html$/.test(pathname.pathname)) {
        resData("." + pathname.pathname,'html', res)
    }
    if (/^\/img\//.test(pathname.pathname)) {
        resData("." + pathname.pathname,'image', res)
    }
    if (/favicon.ico/.test("." + pathname.pathname)) {}


};

exports.respond = sendData;