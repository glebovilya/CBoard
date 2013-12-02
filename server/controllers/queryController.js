var reqUrlContr = require('./reqUrlController');
var postReqController = require('./postReqController');
var dataGetter = require('../db/dataGetter')
var resContr = require('./respondController');
var async = require('async');

var queryLogic = function (req, res) {

    var query = reqUrlContr.readQuery(req);
    var reqMethod = req.method;

    if (reqMethod == 'POST'){
        postReqController.readPostQuery(req, res);
        return
    }

    if (reqMethod == 'GET'){
        switch (query['target']) {
            case 'person':
                if(query['method'] == 'one'){
                    dataGetter.getPerson(query['id'], resContr.resJSON, res);
                    return
                }
                if(query['method'] == 'all'){
                    dataGetter.getPersons(res, resContr.resJSON)
                    return
                }

                break;
            case 'project':
                if(query['method'] == 'one'){
                    dataGetter.getProject(query['id'], resContr.resJSON, res);
                    return
                }
                if(query['method'] == 'all'){
                    dataGetter.getProjects(res, resContr.resJSON)
                    return
                }
                break;
            case 'history':

                break;
            default:
//                statements_def
                break
        }

    }
}


exports.queryLogicController = queryLogic;
