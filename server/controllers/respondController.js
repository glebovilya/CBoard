var fs  = require('fs');
var controller = {
    resFile: function (path, docType, res) {
            fs.readFile(path, function (err, content){
                if(err) {
                    console.log(err);
                    res.end()
                }
                else {
                    var ContType = 'text/' + docType
                    res.writeHeader(200, {'Content-Type': ContType, 'charset': 'utf-8'});
                    res.write(content);
                    res.end();
                }
            })
        },
    resJSON: function (res, /*object*/data) {
        res.writeHeader(200,{
            'Location': '/backend.html',
            'Content-Type': 'application/json'
        })

        res.end(JSON.stringify(data))
    }
};

exports.resFile = controller.resFile;
exports.resJSON = controller.resJSON;