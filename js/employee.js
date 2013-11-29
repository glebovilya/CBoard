/**
 * Created by stepanjuk on 28.11.13.
 */

//define (["!../templates/employe.html"], function(employeeTpl){
define ([], function(){

//var template = ' <div class = "employee">\
//        <div class="employeeWindow ">\
//            <div class="employee-header" >\
//                <div >position</div>\
//                <button type="button" class="close" data-toggle="tooltip" title="remove from project" data-dismiss="modal" aria-hidden="true" >&times;</button>\
//            </div>\
//            <div class="employee-body">\
//                <div class="united" >\
//                    <img src="http://placehold.it/90x120" alt="" ">\
//                        <div class= "name" >Name Surname</div>\
//                    </div>\
//                </div>\
//                <div class="employee-footer">\
//                </div>\
//            </div>\
//        </div>\
//    '

   function Employee(data){
       this.domNode = data['domNode'];
       this.name = data['name'];
       this.surname = data['surname'];
       this.id =data['id'];
       this.template = data['template'];
       this.photo = data['photo'];
//       this.history = data['history'];
       this.destroy = function (event){
           console.log($(this.domNode));
           this.domNode.remove();
       };





       Employee.init = function(){

       }
   }


return Employee;

});