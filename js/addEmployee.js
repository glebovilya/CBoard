/**
 * Created by stepanjuk on 29.11.13.
 */

require(['stepa'], function(){

// прицепить на ининциирующую кнопку  id ="buttonAddNewPeople"
//    console.log($("#buttonAddPeople"));
//    $("#buttonAddPeople").on("click", function(){console.log("yep")});

     $("#buttonAddNewPeople").click(function(event){
//            console.log(event.target);

            var template = '<div id="modalAddPeople" class="modal"\
            role="dialog"\
            aria-labelledby="myModalLabel"\
            aria-hidden="true"\
            data-backdrop = "false"\
            style="display: none;">\
                <form action="/upload_person" method="post" enctype="multipart/form-data" id="addperson">\
                    <div class="modal-header" style="height: 20px">\
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    </div>\
                    <div class="modal-body pull-right" >\
                        <input id="nameAddPeople" class="input-medium" type="text" name="name" placeholder="name">\
                        <input id="surnameAddPeople" class="input-medium" type="text" name="surname" placeholder="surname">\
                        <input id="positionAddPeople" class="input-medium" type="text" name="position" placeholder="position">\
                                    <br/>\
                        <span> &nbsp;&nbsp;add a photo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>\
                        <input id="photoAddPeople" type="file" name="photo" class="btn " multiple="multiple">\
                    </div>\
                    <div class="modal-footer">\
                                        <!--<button class="btn btn-primary">Save changes</button> если не хотим чтоб кнопка закрывала окно -->\
                         <button type= "submit" class="btn btn-custom" id="ajaxAddNewPeople">Add employee</button>\
                    </div>\
                </form>\
            </div>'

                 $(template).appendTo($("#inner-board"));

//            $('#modalAddPeople form').submit(function(){ //listen for submit event
//
//                    $('<input />').attr('type', 'hidden')
//                        .attr('name', 'target')
//                        .attr('value', 'person')
//                        .appendTo('#modalAddPeople form');
//
//                    $('<input />').attr('type', 'hidden')
//                        .attr('name', 'method')
//                        .attr('value', 'add')
//                        .appendTo('#modalAddPeople form');
//                    return true;
//            });

            $("#modalAddPeople .close").on('click', function(){
                $("#modalAddPeople").remove();
            })



//                 $("#ajaxAddNewPeople").on('click', function(){
//
//                     $.post(
//                         "/get",
//                         {
//                             target: 'person',
//                             method: 'add',
//                             name: $("#nameAddPeople").val(),
//                             surname: $("#surnameAddPeople").val(),
//                             position: $("#positionAddPeople").val(),
//                             photo: $("#photoAddPeople").val()
//
//                         },
//                         onAjaxSuccess
//
//                     );

//                     function onAjaxSuccess(data){
//                         // Здесь мы получаем данные, отправленные сервером in Object{data:{Object}}.
//                         console.log(data);
//                 }
//        });

//
     });
});
