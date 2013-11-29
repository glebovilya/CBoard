var dbModels = require('./dbShemas');
var async = require('async')



var getPerson = function(/*Person_ID*/person_id){

    /*
    * function returns an employee data
    * basing on his ID
    * */


    dbModels.Person.find({_id:person_id}, function(err,person) {

    })


}


//
//var getPersons = function(/*string Project_ID || Person_status*/cond){
//
//    /**
//     * depends on a type of condition, translated into a function call
//     * function returns an array of employees_ID's
//     * basing on a project_ID or employee's status
//     */
//    var people;
//    if(cond.split('#')[0].toLowerCase() == 'project'){
//
//        /*
//        * return array of project employees
//        * */
//
//        Project.findOne({_id:cond},function(err,this){
//            people = this.currentEmployees
//        })
//
//
//     } else {
//        /*
//        * return all persons with this status
//        * */
//
//        Person.find({currentStatus:cond},function(err,cond){
//            people = this;
//            console.log(people); // don't ` what value returns
//        })
//
//
//     }
//
//    return people
//}
//
//var getProject = function(/*string*/ project){
//
//    /**
//     * function returns Project data
//     * basing on project_ID
//     */
//
//    return Project.findOne({'_id':project});
//}
//
//var getProjects = function(/*array:History delta || string:Person */cond){
//
//    /*
//    * function returns an object:
//    * {project_ID:{project data}}
//    * */
//
//    var projects = [];
//    if(typeOf(cond) == string){
//        /*
//         * return array of projects connected with this person
//         * */
//        Person.findOne({_id:cond},function(err, this){
//            projects = this.History.project();
//
//        })
//
//    } else {
//        /*
//         * return time-ordered array of projects from date A to date B
//         * current, then finished
//         * */
//        var begin = new Date(cond[0]),
//            end = new Date(cond[1]),
//            days = [];
//
//        while( begin < end ) {
//            days.push(begin);
//            begin.setDate(begin.getDate()+1);
//        }
//        for(var i=0; i<days.length; i++){
//            History.findOne({date:days[i]},function(err,Project){
//                this.project.find({current:true},function(err,project){
//                    projects.indexOf(this)=== -1 ? this.push(projects) : true
//                })
//            })
//        }
//    }
//    return projects
//
//}

exports.getPerson = getPerson;

