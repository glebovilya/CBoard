var fs  = require('fs');
var formidable = require("formidable");
var dataSetter = require('../db/dataSetter');
var querystring = require('querystring');
var resContr = require('./respondController');

var controller = {
    readPostQuery: function(req, res) {

        var content = '';

        req.on('data', function (data) {
            // Append data.
            content += data;
        });

        req.on('end', function () {
            var data = querystring.parse(content);

            switch (data['target']) {
                case 'person':
                    dataSetter.setCurrentPerson(data['id'], resContr.resJSON, res);
                    break;

                case 'project':
                    dataSetter.setCurrentProject(data['id'], resContr.resJSON, res);
                    break;

                case 'history':
                    dataSetter.addHistory(data['id'], data['leaving'], data['date']);
                    break;

                default:
                    break
            }

        });
    }
}

exports.readPostQuery = controller.readPostQuery;

