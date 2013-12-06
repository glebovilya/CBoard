var dbModels = require('./dbShemas');
var fs  = require('fs.extra');

var respondJSON = function(res, data) {
    res.writeHeader(200,{
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data))
};

exports.addPerson = function(req, res) {

    var person = new dbModels.Person({
        name: req.body.name,
        surname: req.body.surname,
        position: req.body.position,
        current: false
    });

    var photo = req.files.photo;
    person.save(function(){

        var photoPath = "./public/images/DB_persons/" + person._id + photo.name;
        var dbPhotoPath = "/images/DB_persons/" + person._id + photo.name;

        fs.move(photo.path, photoPath, function(err) {
            if (err) {
                console.log(err)
            }
            else {
                dbModels.Person.findOneAndUpdate({_id: person._id}, {photo: dbPhotoPath}, function(err, pers) {
                    respondJSON(res, pers)
                })
            }
        });

    })

};
exports.addProject = function(req, res) {

    var project = new dbModels.Project ({
        name: req.body.name,
        start: req.body.startDate,
        current: false
    });
    project.save(function(){
        respondJSON(res, project)
    });
};
exports.addStatus = function( id, name/*req, res*/) {

    /**
    * Commented code(and arguments) represent creating new status from HTTP request function)
    **/

    var status = new dbModels.Status({
        _id: id,
        name: name
    });
    status.save();

//    var status = new dbModels.Status({
//        _id: req.body.id,
//        name: req.body.name
//    });
//    status.save(function(){
//        respondJSON(res, status)
//    });

};
exports.addHistory = function (req, res) {

    /**
    *
    * creates a new history in DB
    *
    * acts like a aggregation field to show
    * what actions were made to person/project in that particular date
    *
    **/

    dbModels.Person.findOne({_id: req.body.personID},function (err, person) {
        /**
         * checks if any person was selected
         */
        if(err) {
            console.log('u didn`t selected any person');
            return
        }

        dbModels.Project.findOne({_id: req.body.projectID},function (err, project){
            /**
             * checkes if any project was selected to edit
             */
            if(err) {
                console.log('u didn`t selected any project to edit');
                return
            }

            dbModels.Status.findOne({_id: req.body.statusID}, function(err, status) {
                /**
                 * checks if status with that id exists
                 */
                if(err) {
                    console.log('no such status');
                    return
                }
                /**
                 * creating new history
                 */
                var history = new dbModels.History({
                    person: person._id,
                    project: project._id,
                    status: status._id,
                    leaving: req.body.leaving
                });
                /**
                 * if date was past as argument assume it, otherwise default date(current date)
                 */
                if(date) {
                    history.date = req.body.date
                }

                if(!(project._id in person.projectList)){
                    person.projectList.push(project._id);
                }

                /**
                 * if the person is leaving that project we had
                 * to remove him from current project in DB.
                 */

                if(leaving){
                    var curEmp = project.currentEmployees;
                    for(var ell in curEmp) {
                        if(person._id === curEmp[ell]){
                            curEmp.splice(ell, 1)
                        }
                    }
                }
                /**
                 * Otherwise we had to add him
                 */
                else {
                    project.currentEmployees.push(person._id)
                }
                person.current = false;
                project.current = false;
                person.currentStatus = status._id;
                person.history.push(history);
                project.history.push(history);

                history.save(respondJSON(res, history));
                person.save();
                project.save();
            });
        });
    });
};

/****************************************
* rudiment function will be removed soon
*****************************************/

exports.setCurrentPerson = function(req, res) {

    /**
     * marks/unmarks this person as current to be able to create history for it
     */

    dbModels.Person.findOne({_id: req.params.id}, function(err, pers) {
        if(pers.current === true) {
            pers.current = false
        } else {
            pers.current = true
        }
        pers.save(respondJSON(res, pers));

    });
};
exports.setCurrentProject = function(req, res) {

    /**
     * marks/unmarks this project as current to be able to create history for it
     */

    dbModels.Project.findOne({_id: req.params.id}, function(err, proj) {
        if(proj.current === true) {
            proj.current = false
        } else {
            proj.current = true
        }
        proj.save(respondJSON(res, proj));

    });
};






