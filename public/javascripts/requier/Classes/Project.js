define(['text!../templates/project.html'], function (template) {
    var Project = function (args) {

        //declaration of Project class
        /*
         * A container, horizontally split on two logical areas:
         *top:
         * contains person widgets of project manager and group leads
         *bottom:
         * this area is a container for displaying developers list
         * and is acceptor for drop event of draggable person widgets
         * */
        var self = this;

        this.__construct = function (/*object*/args) {
            this.buildLogic(args);
            this.renderView();
//            this.id = response//todo arr server response for setting id
            this.template = template;
        };


        this.renderView = function () {
            $(template).appendTo(this.container);
        };
        this.buildLogic = function (args) {
            for (var i in args) {
                this[i] = args[i];
            }
        };



        this.start = new Date();
        this.end = null;
        this.currentEmployees = [];
        this.current = false;
        this.id = null;
        this.name = '';
        this.history = [];



        this.pushHistory = function () {
            /*
             * this method creates a new history records
             * on drag person over the project
             * in the project and person schemas
             * */
            $.get('/project', {
                id: this.id
            }, function () {
                console.log('project request sent')
            });
        };
        this.getEmployees = function(){
            self.currentEmployees || $.get()
        }

//        at last, call of project constructor

        this.__construct();
    };
    return Project;
});

