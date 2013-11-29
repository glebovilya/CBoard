var fs  = require('fs');
var formidable = require("formidable");
var dataSetter = require('../db/dataSetter');

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
        }

}

exports.addPersonToDB = controller.addPersonToDB;
exports.addProjectToDB = controller.addProjectToDB;