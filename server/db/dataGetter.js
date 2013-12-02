var dbModels = require('./dbShemas');

var getPerson = function(/*Person_ID*/person_id, callback, res){

    dbModels.Person.findOne({_id:person_id}, function(err, pers) {
        callback(res, pers)
    })

};

var getPersons = function(res, callback){

    /**
     * depends on a type of condition, translated into a function call
     * function returns an array of employees_ID's
     * basing on a project_ID or employee's status
     */
    dbModels.Person.find(function(err, persons) {
        callback(res, persons)
    })
}

var getProject = function(/*string*/ project_id, callback, res){

    /**
     * function returns Project data
     * basing on project_ID
     */

    dbModels.Project.findOne({_id:project_id}, function(err, proj) {
        callback(res, proj)
    })
};

var getProjects = function(res, callback){

    dbModels.Project.find(function(err, projects) {
        callback(res, projects)
    })
}

exports.getPerson = getPerson;
exports.getProject = getProject;
exports.getPersons = getPersons;
exports.getProjects = getProjects;

