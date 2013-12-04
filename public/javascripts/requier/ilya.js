/*
* This is have to be addProject.js soon
* */

require(['Classes/Project'], function (Project){
    var project = new Project($("#board"),{name:'projectSetup'})
    console.log(project);
});