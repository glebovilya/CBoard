/*
* This is have to be addProject.js soon
* */

require(['Classes/Project'], function (Project){
    var project = new Project({name:'projectSetup'})
//    console.log(project);
//    $.post('/project',{name:project.name,startDate:project.start},function(res){
//        console.log(res)
//    })
    $.get('/users',{},function(res){
//        console.log(res);
        project.getEmployees();
    })
});