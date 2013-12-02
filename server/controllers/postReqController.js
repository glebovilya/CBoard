var fs  = require('fs');
var formidable = require("formidable");
var dataSetter = require('../db/dataSetter');
var resContr = require('./respondController');

var controller = {
    addProjectToDB: function(res, req) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(error, fields) {
            dataSetter.addProject(fields.name, fields.date);
        });
    },
    addPersonToDB: function(res, req) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(error, fields, files) {
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
    },
    readPostQuery: function(req, res) {
        var content = '';

        req.on('data', function (data) {
            // Append data.
            content += data;
        });

        req.on('end', function () {
            // Assuming, we're receiving JSON, parse the string into a JSON object to return.
            var data = JSON.parse(content);

            switch (data['target']) {
                case 'person':
                    if(data['method'] == 'setCurrent'){
                        dataSetter.setCurrentPerson(data['id'], resContr.resJSON, res);
                        return
                    }
                    if(data['method'] == 'add'){
                        controller.addPerson(res, req);
                        return
                    }
                    break;

                case 'project':
                    if(data['method'] == 'setCurrent'){
                        dataSetter.setCurrentProject(data['id'], resContr.resJSON, res);
                        return
                    }
                    if(data['method'] == 'add'){
                        controller.addProject(res, req);
                        return
                    }
                    break;

                case 'history':
                    dataSetter.addHistory(data['id'], data['leaving'], data['date']);
                    break;

                default:
//                statements_def
                    break
            }

        });
    }
}

exports.readPostQuery = controller.readPostQuery;

