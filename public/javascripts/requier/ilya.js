/*
* This is have to be addProject.js soon
* */

require(['Classes/Project'], function (Project){
    var project;

    project = new Project($("#drop"),{'id':'10'});
    project.pushHistory();
});