var reqUrlContr = require('./reqUrlController');
var dbContr = require('./dbController');
var resContr = require('./respondController');
var async = require('async');

var queryLogic = function (req, res) {

    var query = reqUrlContr.readQuery(req);
    console.log('query --->', query);
    var reqMethod = req.method;

    if (reqMethod == 'POST'){
        switch (query['target']) {
            case 'person':
                if(query['method'] == 'setCurrent'){
                    dbContr.setCurrentPersonDB(query['id'], query['value']);
                    return
                }
                if(query['method'] == 'add'){
                    dbContr.addPersonToDB(res, req);
                    return
                }
                break;
            case 'project':
                if(query['method'] == 'setCurrent'){
                    dbContr.setCurrentProjectDB(query['id'], query['value']);
                    return
                }
                if(query['method'] == 'add'){
                    dbContr.addPersonToDB(res, req);
                    return
                }
                break;
            case 'history':
                dbContr.addHistoryToDB(query['id'], query['leaving'], query['date']);
                break;
            default:
//                statements_def
                break
        }
    }

    if (reqMethod == 'GET'){
        switch (query['target']) {
            case 'person':
                dbContr.getPersonDB(query['id'], resContr.resJSON, res);
                break;
            case 'project':
                dbContr.getProjectDB(query['id'], resContr.resJSON, res);
                break;
            case 'history':
//                statementsN
                break;
            default:
//                statements_def
                break
        }

    }
}


exports.queryLogicController = queryLogic;
