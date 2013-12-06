/**
 * Created by stepanjuk on 28.11.13.
 */
define (['text!../templates/employe.html'], function(templ){

    var Person = {
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
                         $(employee.domNode).attr("dataId", employee.id);
                         $(employee.domNode).find(".employee-header").append('<button type="button" class="close" data-toggle="tooltip" title="remove from project"  aria-hidden="true" >&times;</button>');
                         $(employee.domNode).find(".united .name").html(employee.name+'<br/>'+employee.surname);
                         $(employee.domNode).find(".emplPosition").html(employee.position);
                         $(employee.domNode).find(".united img").attr("src", employee.photo);
                         Person.setHandler(employee);
                         });
                    },
        setHandler: function(employee){
                         $(employee.domNode).find("button").on('click', function(event){
                             $(employee.domNode).remove();
                         });
                         $(employee.domNode).drag(function( ev, dd ){
                             $( this ).css({
                                 top: dd.offsetY,
                                 left: dd.offsetX
                             });
                         });

                    }
    };
    return Person;
});




//$(empl.domNode).drag('init',function (ev, dd) {
//    $(dd.drag).parents('div:eq(0)').css('position', 'absolute');
////                   $.post('/user/:id', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){
//
////
//    $.post('/user/'+$(this).attr("dataId"), {}, function(ell){
//        console.log('setCur--->'+ ell+"id="+$(this).attr("dataId") )
//    });
//
//});
//
//$(empl.domNode).drag('end', function (ev, dd) {
//    $.post('/get', {target: 'person', id: 1}, function(ell){
//
//    });
//
//    if (dd.drop) {
//
//        $(dd.drag).removeAttr('style');
//        $(dd.drop).append($(dd.drag).parents('div:eq(0)').css('position', 'relative'));
////
//    }
//});