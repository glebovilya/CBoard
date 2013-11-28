define(['js/Widget','text!cboard/templates/project.html'],function($,Widget,template){
    var Person;

    //declaration of Project class

    Project = $.declare(Widget,{
        /*
        * A container, horizontally split on two logical areas:
        *top:
            * contains person widgets of project manager and groupleads
        *bottom:
            * this area is a container for displaying developers list
            * and is acceptor for drop event of draggable person widgets
        * */
        __construct: function(/*string|domElement|jQuery*/node, /*object*/args){
            this.renderView(node);
            this.buildLogic(args);
            this.id = response//todo arr server response for setting id
        }
        renderView: function(node){
            $('<div.project-container>').appendTo(node).inneerHTML(template);
        },
        buildLogic: function(args){
            this.apply(args);
        }
        close: this.remove(),
        pushHistory: function(){
            /*
            * this method creates a new history records
            * on drag person over the project
            * in the project and person schemas
            * */
            $.ajax(){
//               temprary url

            }
         },
        id:null,
        name:'',
     })

    return Project;
})