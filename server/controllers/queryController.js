var reqUrlContr = require('./reqUrlController');
var postReqController = require('./postReqController');
var dataGetter = require('../db/dataGetter')
var resContr = require('./respondController');

var queryLogic = function (req, res) {

    var query = reqUrlContr.readQuery(req);
    var reqMethod = req.method;

    if (reqMethod == 'POST'){

        switch (query['target']) {
            case 'person':
                if(query['method'] == 'setCurrent'){
                    dbContr.setCurrentPersonDB(query['id'], query['value']);
                    return
                }
                if(query['method'] == 'add'){
                    console.log('прошли queryControler')
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
