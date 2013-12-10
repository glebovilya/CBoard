define(['text!../templates/project.html', 'Classes/Person'], function (template, Person) {

    var Project = function (/*string*/id) {

        //declaration of Project class
        /*
         * A container, horizontally split on two logical areas:
         *top:
         * contains person widgets of project manager and group leads
         *bottom:
         * this area is a container for displaying developers list
         * and is acceptor for drop event of draggable person widgets
         * */

        // object alias
        var self = this;

        this.__construct = function () {
            this.renderView();
            this.buildLogic();
        };

        this.renderView = function () {
            $(template).appendTo($("#inner-board")).css({
                float: 'left'
            }).addClass('drop').attr('id', id );
//            $(template).drop();
            $('a[href="#show"]').on('click',function(e){
                console.log(1);
                $('.developers').css({
                    height: 'auto'
                })
            })

        };
        this.buildLogic = function () {
            //return a project record from db or creates a new record
            !(typeof self == Object) ? this.getProject() : this.createProject();
        };
    this.createNewProject = function () {

    };
    this.getProject = function(){
        $.ajax({
            url: '/project',
            data: {id: id},
            async: false,
            success: function(res){
                for (var i in res.currentEmployees){
                    var person = Person.init({id: res.currentEmployees[i]});
                    console.log(person);
                    self.sortEmployee(person);
                }
            }
        })
    };
    this.setDefaults = function () {
        //      class Project defaults:
//            alert(self);
//            console.log();
        !self.container ? self.container = $("#inner-board") : true;
        !self.start ? self.start = null : true;
        !self.end ? self.end = null : true;
        !self.currentEmployees ? self.currentEmployees = [] : true;
        !self.current ? self.current = false : true;
        !self.id ? self.id = null : true;
        !self.name ? self.name = '' : true;
        !self.history ? self.history = [] : true;

    };
    this.sortEmployee = function(p){

        //

        var
            projl = p.projectList,
            statl = p.statusList,
            devs = $('[data-role=devs]'),
            leads = $('[data-role=leads]');

        //searching in array of projects current project key
        var idx = projl.indexOf(id);

        //searching an employee's status in current project
        status = statl[idx];

        //sort employees corresponding to them project status

        if(status == 2){/*if employee's role is a manager*/
            $(p.domNode).appendTo(leads).css({
                float: 'left',
                position: 'relative'
            })
        }else if(status == 3){/*if employee's role is a group lead*/
            $(p.domNode).appendTo(leads).css({
                float: 'right',
                position: 'relative'
            })
        }else{/*otherwise employee is a developer*/
            $(p.domNode).appendTo(devs).css({
                float: 'left',
                position: 'relative'
            })
        }

//        var empl = self.currentEmployees;
//        var devs = $('[data-role=devs]');
//        var leads = $('[data-role=leads]');
//        for (var i in empl) {
//            var idPerson, parentNode, id, name = empl[i].name;
//            if (empl[i].position != 'Developer') {
//                idPerson = {id: empl[i]._id, parentNode: leads}
//                name = Person.init(idPerson);
//            } else {
//                idPerson = {id: empl[i]._id, parentNode: devs}
//                name = Person.init(idPerson);
//            }
//
//        }
    };
    this.addEmployee = function (empId) {
        //this function adds employee, taken from db by his ID, to this project
//            self.currentEmployees ? console.log('I have some employees!') : self.currentEmployees = [];
        $.ajax({
            url: '/user',
            data: {id: empId},
            async: false,
            method: 'GET',
            success: function (data) {
                self.currentEmployees.push(data);
            }
        })
    };


    this.pushHistory = function () {
        /*
         * this method creates a new history records
         * on drag person over the project
         * in the project and person schemas
         */
    };

    this.getEmployees = function () {
//Закоменчено пока не разобрались с историей
//            $.get('/project',{id:id},function(data){
//                console.log(data);
//            })
        console.log(self);
        return self.currentEmployees;

    };

//        at last, call of project constructor

    this.__construct();
};
return Project;
})
;

