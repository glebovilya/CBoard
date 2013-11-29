/**
 * Created by stepanjuk on 29.11.13.
 */

require([], function(){

// прицепить на ининциирующую кнопку  id ="buttonAddNewPeople"


//    console.log($("#buttonAddPeople"));
//    $("#buttonAddPeople").on("click", function(){console.log("yep")});





        $("#buttonAddNewPeople").click(function(event){
            console.log(event.target);

            var template = '<div id="modalAddPeople" class="modal"\
            role="dialog"\
            aria-labelledby="myModalLabel"\
            aria-hidden="true"\
            data-backdrop = "false"\
            style="display: none;">\
                <form action="/" method="post">\
                    <div class="modal-header" style="height: 20px">\
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    </div>\
                    <div class="modal-body pull-right" >\
                        <input id="nameAddPeople" class="input-medium" type="text" placeholder="name">\
                        <input id="surnameAddPeople" class="input-medium" type="text" placeholder="surname">\
                        <input id="positionAddPeople" class="input-medium" type="text" placeholder="position">\
                                    <br/>\
                        <span> &nbsp;&nbsp;add a photo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>\
                        <input id="photoAddPeople" type="file" class="btn ">\
                    </div>\
                    <div class="modal-footer">\
                                        <!--<button class="btn btn-primary">Save changes</button> если не хотим чтоб кнопка закрывала окно -->\
                         <button type= "button" class="btn btn-custom" id="ajaxAddNewPeople">Add employee</button>\
                    </div>\
                </form>\
            </div>'
                 $(template).appendTo($("#inner-board"));
                 $("#ajaxAddNewPeople").on('click', function(){



                     $.post(
                         "/get",
                         {
                             target: 'person',
                             method: 'add',
                             name: $("#nameAddPeople").val(),
                             surname: $("#surnameAddPeople").val(),
                             position: $("#positionAddPeople").val(),
                             photo: $("#photoAddPeople").val()

                         },
                         onAjaxSuccess

                     );

                     function onAjaxSuccess(data){
                         // Здесь мы получаем данные, отправленные сервером in Object{data:{Object}}.
                         console.log(data);
                 }

        });


});
});
