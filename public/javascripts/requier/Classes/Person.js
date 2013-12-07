/**
 * Created by stepanjuk on 28.11.13.
 */
define (['text!../templates/employe.html'], function(templ){

    var Person = {
        init: function(idPerson){
                     function  onAjaxSuccess(data){
                         data.id = id;
                         if(parentNode) data.parentNode =parentNode;
                         var employee = new Person.Employee(data);
                         Person.render(employee);

                     }
                     function onAjaxSuccessForPhoto(data){
                         data.id = id;
                         var employee = new Person.Employee(data);
                         Person.renderForPhoto(employee);
                     }
                     var id = idPerson['id'];
                     var parentNode =idPerson['parentNode'];
                     if(idPerson['forPhoto']=="true"){
                            $.get("/user",{ id: id}, onAjaxSuccessForPhoto);
                     } else{
                        $.get("/user",{ id: id}, onAjaxSuccess);
                     }
               },

        Employee: function (data){
                     var idFix = Math.random().toString(36).slice(3,9);
                     this.idFix = idFix;
                     this.domNode= "#"+idFix;
                     this.name = data['name'];
                     this.surname = data['surname'];
                     this.id =data['id'];
                     this.photo = data['photo'];
                     this.position = data['position'];
                     this.parentNode = data['parentNode']
                    },

        template: templ,
        render: function(employee){
                    var divWindow =document.createElement("div");
                    if(employee.parentNode){
                        employee.parentNode.append(divWindow)

                    }else{
                        $("#inner-board").append(divWindow);
                        divWindow.className = "employeeWindow";
                    }


                    divWindow.id = employee.idFix;

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
        renderForPhoto: function(employee){
                        var divWindow =document.createElement("div");
                        $(divWindow).appendTo($("#windowForPhoto"));
                        divWindow.id = employee.idFix;
                        divWindow.className = "forPhoto";

                        $(Person.template).appendTo($(divWindow));


                        $(employee.template).ready(function(){
                            $(employee.domNode).find(".united .name").html(employee.name+'<br/>'+employee.surname);
                            $(employee.domNode).find(".emplPosition").html(employee.position);
                            $(employee.domNode).find(".united img").attr("src", employee.photo);
                        });
                    },
        setHandler: function(employee){
                         console.log(employee);
                         $(employee.domNode).find("button").on('click', function(event){
                             $(employee.domNode).remove();
                         });


                        jQuery(function(S){
                         $(employee.domNode).drag(function( ev, dd ){
                              $( this ).css({
                                 top: dd.offsetY,
                                 left: dd.offsetX
                             });
                         });
                            $(employee.domNode).drag('init',function (ev, dd) {
                                $(dd.drag).parents('div:eq(0)').css('position', 'absolute');
//                              $.post('/user/:id', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){

                                var self=this;
                                $.post('/user/'+$(this).attr("dataId"), {}, function(ell){
                                    console.log("id="+$(self).attr("dataId") );
                                });
                            });
                            $(employee.domNode).drag('end', function (ev, dd) {
//                                 $.post('/get', {target: 'person', id: 1}, function(ell){
                                console.log(dd.drop)

                            });
//                            $(".drop").drop(function(){
//                                $( this ).toggleClass('dropped');
//
//                            });
                        });







                     }
    };
    return Person;
});

//
//$(employee.domNode).drag('init',function (ev, dd) {
//    $(dd.drag).parents('div:eq(0)').css('position', 'absolute');
////                              $.post('/user/:id', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){
//
//    var self=this;
//    $.post('/user/'+$(this).attr("dataId"), {}, function(ell){
//        console.log("id="+$(self).attr("dataId") );
//    });
//});
//$(employee.domNode).drag('end', function (ev, dd) {
////                                 $.post('/get', {target: 'person', id: 1}, function(ell){
//    console.log(dd.drop)
//
//});

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