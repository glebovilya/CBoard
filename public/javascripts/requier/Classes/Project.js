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
            $(template).appendTo($("#inner-board"));

        };
        this.buildLogic = function () {
            //return a project record from db
//            console.log(typeof self);
            if (!(typeof self == Object)) {
                $.ajax({
                        url: '/project',
                        async: false,
                        method: 'GET',
                        data: {id: id},
                        success: function (res) {
                            for (var i in res) {
                                self[i] = res[i];
                            }
                            // временный костыль, при появлении функционала истории исчезнет сам по себе
                            self.setDefaults();

                            for (var i = 70; i < 74; i++) {
                                self.addEmployee(i);
                            }

                            var empl = self.currentEmployees;
                            var devs = $('[data-role=devs]');
                            var leads = $('[data-role=leads]');
                            for (var i in empl) {
                                var idPerson, parentNode, id, name = empl[i].name;
                                if (empl[i].position != 'Developer') {
                                    idPerson = {id: empl[i]._id, parentNode: leads}
                                    name = Person.init(idPerson);
                                } else {
                                    idPerson = {id: empl[i]._id, parentNode: devs}
                                    name = Person.init(idPerson);
                                }

                            }
                            ;

                        }}
                )
            }
            ;
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
        }


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
});

