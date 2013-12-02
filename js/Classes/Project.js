define(['text!../../templates/project.html'], function (template) {
    var Project;

    Project = {

        //declaration of Project class
        /*
         * A container, horizontally split on two logical areas:
         *top:
         * contains person widgets of project manager and group leads
         *bottom:
         * this area is a container for displaying developers list
         * and is acceptor for drop event of draggable person widgets
         * */
        renderView: function (node) {
            $('<div.project-container>').appendTo(node).inneerHTML(template);
        },
        buildLogic: function () {},
        pushHistory : function(){
            /*
            * this method creates a new history records
            * on drag person over the project
            * in the project and person schemas
            * */
            $.get('/get',{
                target: project,
                id:this.id
            },function(){
                console.log('project request sent')
            }
         }
        response: function(){
            $.get('/get',{},function)
            return response;
        }
        id: null,
        name: '',
        __construct : function (/*string|domElement|jQuery*/node, /*object*/args) {
            console.log(this);
            this.superclass.apply(this, arguments);
            this.renderView(node);
            this.buildLogic(args);
            this.id = response//todo arr server response for setting id
            this.template = template;
        }
    };
    return Project;
});