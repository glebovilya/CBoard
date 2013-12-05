/**
 * Created by stepanjuk on 02.12.13.
 */
define(['Classes/Person','text!./templates/employe.html' ], function(Employee, templ){




        function showPerson(dataId){
//        $(document).ready(function(){

//            $("#people").find($(".list-item")).click(function(event){
//                console.log(event.target);







                var dom = event.target;// в случае если внутри li нет <a> или другого потомка
                var dom = $(dom).parent("li")// if there <> inside
//                var id = $(dom).attr("data-point-id");
                var id = dataId;
                var idFix = Math.random().toString(36).slice(3,9);

                $.get(
                    "/user",
                    {

                        id: id
                    },
                    onAjaxSuccess
                );

                function onAjaxSuccess(data)
                {
                    // Здесь мы получаем данные, отправленные сервером in Object{data:{Object}}.
//                    console.log(data);

                    var divWindow =document.createElement("div");
                    document.body.appendChild(divWindow);
                    divWindow.style.zIndex = 99999;
                    divWindow.style.position = "absolute";
                    divWindow.style.top = "100px";
                    divWindow.style.left = "500px";
                    id = "person_"+idFix;
                    divWindow.id = id;


                    var empl = new Employee({
                        domNode: $("#" + id),
                        photo: data.photo,
                        name: data.name,
                        surname: data.surname,
                        position:data.position
                    });
//                    console.log(empl.domNode);
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




                    jQuery(function($){
                        $(empl.domNode).drag(function( ev, dd ){
                            console.log(this.id);
                            $( this ).css({
                                top: dd.offsetY,
                                left: dd.offsetX
                            });


                        });
                    });

                    $(empl.domNode).drag('init',function (ev, dd) {
                        $(dd.drag).parents('div:eq(0)').css('position', 'absolute');
//                   $.post('/user/:id', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){
                   $.post('/user/:'+this.id, {}, function(ell){
                        console.log('setCur--->'+ ell+"id="+this.id )
                    })
//                        console.log('set current person to true');
//                        console.log(ev)
                    });

                    $(empl.domNode).drag('end', function (ev, dd) {
                    $.post('/get', {target: 'person', id: 1}, function(ell){
//                        console.log('dismiss--->',ell)
                    });
//                    console.log('set current person to false');
                    if (dd.drop) {
                        //                    $.ajax('/get')
                        $(dd.drag).removeAttr('style');
                        $(dd.drop).append($(dd.drag).parents('div:eq(0)').css('position', 'relative'));
//                        console.log('Ура работает');
//                        console.log('create history');
//                        $.get('/get', {target: 'person', method: 'one', id: 1}, function(ell){
////                            console.log(ell)
//                        })
                        }
                    });
                 return empl;
                }


        }
    return showPerson

});



//
//                    (function () {
//                        function init () {
//                            $(empl.domNode)
//                                .drag('init', function (ev, dd) {
//                                    $(dd.drag).parents('div:eq(0)').css('position', 'absolute')
////                    $.post('/get', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){
////                        console.log('setCur--->', ell)
////                    })
//                                    console.log('set current person to true')
//                                    console.log(ev)
//                                })
//                                .drag('end', function (ev, dd) {
//                                    $.post('/get', {target: 'person', id: 1}, function(ell){
//                                        console.log('dismiss--->',ell)
//                                    })
//                                    console.log('set current person to false')
//                                    if (dd.drop) {
//                                        //                    $.ajax('/get')
//                                        $(dd.drag).removeAttr('style')
//                                        $(dd.drop).append($(dd.drag).parents('div:eq(0)').css('position', 'relative'));
//                                        console.log('create history')
////                        $.get('/get', {target: 'person', method: 'one', id: 1}, function(ell){
//////                            console.log(ell)
////                        })
//                                    }
//                                })
//                                .drag(function( ev, dd ){
//                                    $( this ).css({
//                                        top: dd.offsetY,
//                                        left: dd.offsetX
//                                    });
//                                });
//                            $('#drop')
//                                .drop('start',function(){
//                                    console.log('set current project to true');
//                                })
//                                .drop('end', function(){
//                                    console.log('set current project to false');
//
//                                })
//
//
//
//
//                            $('#addperson').submit(function(event){
//
//                                //disable the default form submission
//                                event.preventDefault();
//
//                                //grab all form data
//                                var formData = new FormData($(this)[0]);
//
//                                $.ajax({
//                                    url: '/upload_person',
//                                    type: 'POST',
//                                    data: formData,
//                                    async: false,
//                                    cache: false,
//                                    contentType: false,
//                                    processData: false,
//                                    success: function (returndata) {
//                                        alert(returndata);
//                                    }
//                                });
//
//                                return false;
//                            });
//                            $('#addproject').submit(function( captureSubmit ) {
//                            });
////            $('body').on('click', function() {$.ajax({url: '/img/45.jpg', dataType: 'image'}, function() {console.log('2')})})
//                        }
//                        return init
//                    });
