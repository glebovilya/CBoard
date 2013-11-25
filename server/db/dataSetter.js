var dbModels = requier('./dbShemas');

var addPerson = function(/*Number*/id, /*String*/ name, /*String*/ surname, /*String*/ position, /*String*/ photo) {
    var person = new dbModels.Person({
        _id: id,
        name: name,
        surname: surname,
        position: position,
        photo: photo,
        current: false
    })
};

var addProject = function(/*Number*/id, /*String*/name, /*Boolean*/current) {
    var project = new dbModels.History ({
        _id: id,
        name: name,
        current: false
    })
}

var addStatus = function(/*number*/id , /*String*/name) {
    var status = new dbModels.Stats({
        _id: id,
        name: name
    })
}

var addHistory = function (/*Number*/id, /*Number*/status_id, /*Date*/date, /*Boolean*/leaving) {

    var currentPerson = dbModels.Person.findOne({current: true});
    var currentProject = dbModels.Project.findOne({current: true});
    var status = dbModels.Status.findOne({id: status_id});

    var person;
    var project;

    currentPerson ? person = currentPerson : person = null;

    currentProject ? project = currentProject : project = null;

    var history = new dbModels.History({
        _id: id,
        person: person._id,
        project: project._id,
        status: status._id,
        date: date,
        leaving: leaving
    })
}

var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

aaron.save(function (err) {
    if (err) return handleError(err);

    var story1 = new Story({
        title: "Once upon a timex.",
        _creator: aaron._id    // assign the _id from the person
    });

    story1.save(function (err) {
        if (err) return handleError(err);
        // thats it!
    });
})

