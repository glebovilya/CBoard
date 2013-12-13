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
    if(req.body.startDate) {
        var project = new dbModels.Project ({
            name: req.body.name,
            start: req.body.startDate,
            current: false
            });
    }
    else {
        var project = new dbModels.Project ({
            name: req.body.name,
            current: false
        });
    }
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
        if(err){console.log(err)}
        dbModels.Project.findOne({_id: req.body.projectID},function (err, project){
            if(err){console.log(err)}
            dbModels.Status.findOne({_id: req.body.statusID}, function(err, status) {
                if(err){console.log(err)}

                if(!person || !project || !status) {
                    respondJSON(res, {err: 'wrong IDs'});
                    return
                }

                /*********************
                * creating new history
                **********************/
                var history = new dbModels.History({
                    person: person._id,
                    project: project._id,
                    status: status._id,
                    leaving: req.body.leaving
                });
                /****************************************************************************
                * if date was past as argument assume it, otherwise default date(current date)
                *****************************************************************************/
                if(req.body.date) {
                    history.date = req.body.date
                }


                var idx = person.projectList.indexOf(project._id);
                var projList = person.projectList;
                var statusList = person.statusList;
                /*******************************************************************
                * here we check if that project not in projectList of that person
                ********************************************************************/
                if(idx == -1){
                    /*************************************************************
                    * if not - add this project and status
                    * assigned to this person in that particular project to person
                    **************************************************************/
                    projList.push(project._id);
                    statusList.push(status._id);
                } else {
                    /****************************************************************
                    * and if that project in projectList we had to check his status
                    * if it changed during history creation we had to change it in DB
                    *****************************************************************/
                    if(statusList[idx] != status._id) {
                        statusList.set(idx, status._id)
                    }
                }
                var personList = project.currentEmployees;
                var persIDX = personList.indexOf(person._id)
                /*********************************************
                * if the person is leaving that project we had
                * to remove him from current project in DB.
                **********************************************/
                if(history.leaving){
                    personList.splice(persIDX,1)
                }
                /****************************
                * Otherwise we had to add him
                *****************************/
                else {
                    if(persIDX == -1){
                        personList.push(person._id)
                    }
                }

                person.currentStatus = status._id;
                person.history.push(history);
                project.history.push(history);

                history.save(respondJSON(res, history));
                person.save(function(err, doc){console.log(doc)});
                project.save();
            });
        });
    });
};







