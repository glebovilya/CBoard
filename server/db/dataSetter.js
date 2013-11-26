var dbModels = require('./dbShemas');

var addPerson = function(/*Number*/id, /*String*/ name, /*String*/ surname, /*String*/ position, /*String*/ photo) {

    /*
     * creates a new person in DB
     * */

    var person = new dbModels.Person({
        _id: id,
        name: name,
        surname: surname,
        position: position,
        photo: photo,
        current: false
    });
    person.save()
};

var addProject = function(/*Number*/id, /*String*/name, /*Date*/startDate) {

    /*
     * creates a new project in DB
     * */

    var project = new dbModels.Project ({
        _id: id,
        name: name,
        start: startDate,
        current: false
    });

    project.save();
}

var addStatus = function(/*number*/id , /*String*/name) {

    /*
     * creates a new status(free, manager, lead, etc.) in DB
     * */

    var status = new dbModels.Status({
        _id: id,
        name: name
    });
    status.save();
}

var addHistory = function (/*Number*/status_id, /*Boolean*/leaving, /*Date*/date) {

    /*
     *
     * creates a new history in DB
     *
     * acts like a aggregation field to show
     * what actions were made to person/project in that particular date
     *
     * */

    dbModels.Person.findOne({current: true},function (err, person) {
        /*
        * checks if any person was selected
        * */
        if(err) {
            console.log('u didn`t selected any person');
            return
        }

        dbModels.Project.findOne({current: true},function (err, project){
            /*
            * checkes if any project was selected to edit
            * */
            if(err) {
                console.log('u didn`t selected any project to edit');
                return
            }

            dbModels.Status.findOne({_id: status_id}, function(err, status) {
                /*
                * checks if status wis that id exists
                * */
                if(err) {
                    console.log('no such status');
                    return
                }
                /*
                * creating new history
                * */
                var history = new dbModels.History({
                    person: person._id,
                    project: project._id,
                    status: status._id,
                    leaving: leaving
                });
                /*
                * if date was past as argument assume it, otherwise default date(current date)
                * */
                if(date) {
                    history.date = date
                }

                if(!(project._id in person.projectList)){
                    person.projectList.push(project._id);
                }

                /*
                * if the person is leaving that project we had
                * to remove him from current project in DB.
                * */

                if(leaving){
                    var curEmp = project.currentEmployees;
                    for(var ell in curEmp) {
                        if(person._id === curEmp[ell]){
                            curEmp.splice(ell, 1)
                        }
                    }
                }
                /*
                * Otherwise we adding him
                * */
                else {
                    project.currentEmployees.push(person._id)
                }

                person.currentStatus = status._id;
                person.history.push(history);
                project.history.push(history);

                history.save();
                person.save();
                project.save();
            });
        });
    });
};

var setCurrentPerson = function(/*Number*/id, /*Boolean*/value) {

    /*
    * marks/unmarks this person as current to be able to create history for it
    * */

     dbModels.Person.findOne({_id: id}, function(err, doc) {
        doc.current = value;
        doc.save()
    });
};

var setCurrentProject = function(/*Number*/id, /*Boolean*/value) {

    /*
     * marks/unmarks this project as current to be able to create history for it
     * */

    dbModels.Project.findOne({_id: id}, function(err, doc) {
        doc.current = value;
        doc.save()
    });
};

    /*
    * getall is just for testing!
    * */

var getall = function(){
    dbModels.Person.findOne({_id: 1},function(err, history) {

            console.log(history.projectList)
        }
    )
//    dbModels.History.findOne({_id: '529375a50ef5f31410000001'}).populate('person').exec(function(err, history) {
//        console.log(history.person.name)
//    })
//
//    dbModels.Status.count({}, function(err, count) {
//        console.log(count)
//    })

//    dbModels.Person.find({}, function (err, f) {console.log(f)})
//    dbModels.History.find({}, function (err, f) {console.log(f)})

};

exports.addPerson = addPerson;
exports.addProject = addProject;
exports.addStatus = addStatus;
exports.addHistory = addHistory;
exports.setCurrentPerson = setCurrentPerson;
exports.setCurrentProject = setCurrentProject;
exports.addPersonToProject = addPersonToProject;
exports.getall = getall;



