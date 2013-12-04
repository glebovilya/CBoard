define(['text!../templates/addproject.html'], function (template) {
    var Project = function (node, /*object?*/opts) {

        //declaration of Project class
        /*
         * A container, horizontally split on two logical areas:
         *top:
         * contains person widgets of project manager and group leads
         *bottom:
         * this area is a container for displaying developers list
         * and is acceptor for drop event of draggable person widgets
         * */

        this.__construct = function (/*object*/args) {
            for (var i in opts) {
                this[i] = opts[i];
            }
            console.log(node);
            this.renderView(node);
            this.buildLogic(args);
//            this.id = response//todo arr server response for setting id
            this.template = template;
        };
        this.container = node;
        this.renderView = function (container) {

            $(template).appendTo(container);
        };
        this.buildLogic = function () {
        };
        this.pushHistory = function () {
            /*
             * this method creates a new history records
             * on drag person over the project
             * in the project and person schemas
             * */
            $.get('/get', {
                target: 'project',
                id: this.id
            }, function () {
                console.log('project request sent')
            });
        };
        this.response = function () {
            $.get('/get', {}, function () {
            })
            return response;
        };
        this.id = null;
        this.name = '';
        this.__construct();
    };
    return Project;
});