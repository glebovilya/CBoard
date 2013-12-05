/**
 * Created by stepanjuk on 28.11.13.
 */
define (['text!../templates/employe.html'], function(templ){

    var Person ={
        init: function(idPerson){
                     function  onAjaxSuccess(data){
                         data.id = id;
                         var employee = new Person.Employee(data)
                         Person.render(employee);
                     }
                     var id = idPerson;
                     $.get("/user",{ id: id}, onAjaxSuccess);
               },

        Employee: function (data){
                     var idFix = Math.random().toString(36).slice(3,9);
                     this.idFix = idFix
                     this.domNode= "#"+idFix;
                     this.name = data['name'];
                     this.surname = data['surname'];
                     this.id =data['id'];
                     this.photo = data['photo'];
                     this.position = data['position'];
                    },

        template: templ,
        render: function(employee){
                    var divWindow =document.createElement("div");
                    document.body.appendChild(divWindow);
                    divWindow.id = employee.idFix;
                    divWindow.className = "newEmployee";
                    $(divWindow).append(Person.template);
                    $(employee.template).ready(function(){
                         $(employee.domNode).find(".employee-header").append('<button type="button" class="close" data-toggle="tooltip" title="remove from project"  aria-hidden="true" >&times;</button>');
                         $(employee.domNode).find(".united .name").html(employee.name+'<br/>'+employee.surname);
                         $(employee.domNode).find(".emplPosition").html(employee.position);
                         $(employee.domNode).find(".united img").attr("src", employee.photo)
                         $(employee.domNode).find("button").on('click', function(event){
                             $(employee.domNode).remove();
                         });
                     });
                }
    };
    return Person;
});