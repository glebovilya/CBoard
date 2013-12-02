define(['classes/Widget', 'text!../../templates/project.html'], function (Widget, template) {
    var Project;

    Project = {
        // first, we have to inherit parent class to have a constructor



            //declaration of Project class
            /*
             * A container, horizontally split on two logical areas:
             *top:
             * contains person widgets of project manager and groupleads
             *bottom:
             * this area is a container for displaying developers list
             * and is acceptor for drop event of draggable person widgets
             * */

        __construct : function (/*string|domElement|jQuery*/node, /*object*/args) {
            console.log(this);
//          this.superclass.apply(this, arguments);
            this.renderView(node);
            this.buildLogic(args);
            this.id = response//todo arr server response for setting id
            this.template = template;
        },

        renderView : function (node) {
            $('<div.project-container>').appendTo(node).inneerHTML(template);
        },
        buildLogic : function (args) {
                this.apply(args);
        },
            //        this.pushHistory = function(){
            //            /*
            //            * this method creates a new history records
            //            * on drag person over the project
            //            * in the project and person schemas
            //            * */
            //            $.get('/server',{
            //                id:'asd'
            //            },function(){
            //                console.log('success')
            //            }
            //         }
        id : null,
        name : ''

    };

    extend( Project ,Widget);
    return Project.__construct;


});