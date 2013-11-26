var dbModels = require('./dbShemas');

var addPerson = function(/*Number*/id, /*String*/ name, /*String*/ surname, /*String*/ position, /*String*/ photo) {
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

var addProject = function(/*Number*/id, /*String*/name, startDate) {
    var project = new dbModels.Project ({
        _id: id,
        name: name,
        start: startDate,
        current: false
    });

    project.save();
}

var addStatus = function(/*number*/id , /*String*/name) {
    var status = new dbModels.Status({
        _id: id,
        name: name
    });
    status.save();
}

var addHistory = function (/*Number*/status_id, /*Boolean*/leaving, /*Date*/date) {

    dbModels.Person.findOne({current: true},function (err, person) {
        dbModels.Project.findOne({current: true},function (err, project){
            dbModels.Status.findOne({_id: status_id}, function(err, status) {

                var history = new dbModels.History({
                    person: person._id,
                    project: project._id,
                    status: status._id,
                    leaving: leaving
                });

                if(date) {
                    history.date = date
                }

                person.history.push(history);
                project.history.push(history);


                history.save();
                person.save();
                project.save();
            });
        });
    });
};

var setCurrentPerson = function(/*Number*/id, /*true\false*/value) {
    dbModels.Person.findOne({_id: id}, function(err, doc) {
        doc.current = value;
        doc.save()
    });
};

var setCurrentProject = function(/*Number*/id, /*true:false*/value) {
    dbModels.Project.findOne({_id: id}, function(err, doc) {
        doc.current = value;
        doc.save()
    });
};

var addPersonToProject = function(/*Number*/person_id, /*Number*/project_id) {
    dbModels.Person.findOne({_id: person_id}, function(err,person) {
        dbModels.Project.findOne({_id: project_id}, function(err, project) {
            project.currentEmployees.push(person._id);
            person.projectList.push(project._id);
            person.save();
            project.save();
        });
    });
};

var getall = function(){
    dbModels.Person.findOne({_id: 1},function(err, history) {

            console.log(history.history)
        }
    )
    dbModels.History.findOne({_id: '529375a50ef5f31410000001'}).populate('person').exec(function(err, history) {
        console.log(history.person.name)
    })

    dbModels.Status.count({}, function(err, count) {
        console.log(count)
    })

};

exports.addPerson = addPerson;
exports.addProject = addProject;
exports.addStatus = addStatus;
exports.addHistory = addHistory;
exports.setCurrentPerson = setCurrentPerson;
exports.setCurrentProject = setCurrentProject;
exports.addPersonToProject = addPersonToProject;
exports.getall = getall;



