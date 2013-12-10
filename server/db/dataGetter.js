var dbModels = require('./dbShemas');

var respondJSON = function(res, data) {
    res.writeHeader(200,{
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data))
};

exports.getPerson = function(req, res){
    dbModels.Person.findOne({_id: req.query.id}, function(err, pers) {
        respondJSON(res, pers)
    })
};

exports.getPersons = function(req, res){
    var query = {};

    if (req.body.currentEmployees){
        query = {'_id': {$in: req.body.currentEmployees}}
    }

    dbModels.Person.find(query, function(err, persons) {
        respondJSON(res, persons)
    })
};

exports.getProject = function(req, res){
    dbModels.Project.findOne({_id: req.query.id}, function(err, proj) {
//        console.log(req.query);
        respondJSON(res, proj)
    })
};

exports.getProjects = function(req, res){
    dbModels.Project.find(function(err, projects) {
        respondJSON(res, projects)
    })
};

exports.getStatus = function(req, res){
    dbModels.Status.find(function(err, statuses){
        respondJSON(res, statuses)
    })
}


