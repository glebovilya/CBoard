var fs  = require('fs');
var formidable = require("formidable");
var dataSetter = require('../db/dataSetter');
var dataGetter = require('../db/dataGetter');

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
    setCurrentPersonDB: function (id, value) {
            dataSetter.setCurrentPerson(id, value)
        },
    setCurrentProjectDB: function (id, value) {
            dataSetter.setCurrentProject(id, value)
        },
    addHistoryToDB: function(/*Number*/status_id, /*Boolean*/leaving, /*Date*/date) {
            dataSetter.addHistory(status_id, leaving, date)
        },
    getPersonDB: function(id, callback, res) {
            dataGetter.getPerson(id, callback, res)
        },
    getProjectDB: function(id, callback, res) {
            dataGetter.getProject(id, callback, res)
        }
}

exports.addPersonToDB = controller.addPersonToDB;
exports.addProjectToDB = controller.addProjectToDB;
exports.setCurrentPersonDB = controller.setCurrentPersonDB;
exports.setCurrentProjectDB = controller.setCurrentProjectDB;
exports.addHistoryToDB = controller.addHistoryToDB;
exports.getPersonDB = controller.getPersonDB;
exports.getProjectDB = controller.getProjectDB;
