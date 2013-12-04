var dbModels = require('./dbShemas');

    exports.getPerson = function(req, res){

        dbModels.Person.findOne({_id: req.body.id}, function(err, pers) {
            res.end(JSON.stringify(pers))
        })

    }
    exports.getPersons = function(req, res){

        /**
         * depends on a type of condition, translated into a function call
         * function returns an array of employees_ID's
         * basing on a project_ID or employee's status
         */
        dbModels.Person.find(function(err, persons) {
            res.end(JSON.stringify(persons))
        })
    }
    exports.getProject = function(req, res){

        /**
         * function returns Project data
         * basing on project_ID
         */

        dbModels.Project.findOne({_id: req.body.id}, function(err, proj) {
            res.end(JSON.stringify(proj))
        })
    }
    exports.getProjects = function(req, res){

        dbModels.Project.find(function(err, projects) {
            res.end(JSON.stringify(projects))
        })
    }


