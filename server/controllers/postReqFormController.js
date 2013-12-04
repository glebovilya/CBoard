var fs  = require('fs.extra');
var formidable = require("formidable");
var dataSetter = require('../db/dataSetter');
var resContr = require('./respondController');


var controller = {
    addProjectToDB: function(res, req) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(error, fields) {
            dataSetter.addProject(fields.name, new Date()/*fields.date*/, resContr.resJSON, res);
        });
    },
    addPersonToDB: function(res, req) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(error, fields, files) {
            dataSetter.addPerson(fields.name, fields.surname, fields.position, resContr.resJSON, res, files['photo'])
        });
    }
}

exports.addPersonToDB = controller.addPersonToDB;
exports.addProjectToDB = controller.addProjectToDB;