/**
 * Created by stepanjuk on 02.12.13.
 */
define(['Classes/Person','text!./templates/employe.html' ], function(Employee, templ){

        function showPerson(dataId){


                var id = dataId;
                var idFix = Math.random().toString(36).slice(3,9);

                $.get("/user",{ id: id},onAjaxSuccess);

                function onAjaxSuccess(data){
                    // Здесь мы получаем данные, отправленные сервером in Object{data:{Object}}.
//                    console.log(data);


                    var divWindow =document.createElement("div");
                    document.body.appendChild(divWindow);
                    divWindow.style.zIndex = 99999;
                    divWindow.style.position = "absolute";
                    divWindow.style.top = "100px";
                    divWindow.style.left = "500px";

                    idFix = "person_"+idFix;
                    divWindow.id = idFix;


                    var empl = new Employee({
                        domNode: $("#" + idFix),
                        id:id,
                        photo: data.photo,
                        name: data.name,
                        surname: data.surname,
                        position:data.position
                    });

                    empl.template =templ;

                    $(divWindow).append(empl.template);
                    $(empl.template).ready(function(){

                        $(empl.domNode).find(".employee-header").append('<button type="button" class="close" data-toggle="tooltip" title="remove from project"  aria-hidden="true" >&times;</button>');
                        $(empl.domNode).find(".united .name").html(empl.name+'<br/>'+empl.surname);
                        $(empl.domNode).find(".emplPosition").html(empl.position);
                        $(empl.domNode).find(".united img").attr("src", empl.photo)
                    });

                    $(empl.domNode).find("button").on('click', function(event){
                        $(empl.domNode).remove();
                    });

                    $(empl.domNode).attr("dataId", id);
                   jQuery(function($){

                        $(empl.domNode).drag(function( ev, dd ){


//                            console.log($(this).attr("dataId"));
                            $( this ).css({
                                top: dd.offsetY,
                                left: dd.offsetX
                            });


                        });
                    });

                    $(empl.domNode).drag('init',function (ev, dd) {
                        $(dd.drag).parents('div:eq(0)').css('position', 'absolute');
//                   $.post('/user/:id', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){

//
                    $.post('/user/'+$(this).attr("dataId"), {}, function(ell){
                        console.log('setCur--->'+ ell+"id="+$(this).attr("dataId") )
                    });

                    });

                    $(empl.domNode).drag('end', function (ev, dd) {
                    $.post('/get', {target: 'person', id: 1}, function(ell){

                    });

                    if (dd.drop) {

                        $(dd.drag).removeAttr('style');
                        $(dd.drop).append($(dd.drag).parents('div:eq(0)').css('position', 'relative'));
//
                        }
                    });

                 return empl;
            }
        }
    return showPerson
});

