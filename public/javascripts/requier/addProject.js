/**
 * Created by stepanjuk on 02.12.13.
 */

define(['text!./templates/addProject.html'],function (templ) {

$(document).ready(function(){

    $("#buttonAddNewProject").click(function(event){

    var template = templ;





    $(template).appendTo($("#inner-board"));


        $('#modalAddProject form').submit(function(){ //listen for submit event

            var formData = new FormData($(this)[0]);

            $.ajax({
                url: '/project',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (returndata) {
                    onAjaxSuccess(returndata);
                        console.log(returndata)
                }
            });

            return false;

        });

        function onAjaxSuccess(data){// по приходу колбэка после сохранения нового сотрудника

            $("#modalAddProject :input").val("");

        }



//    $('#modalAddProject form').submit(function(){ //listen for submit event
//
//        $('<input />').attr('type', 'hidden')
//            .attr('name', 'target')
//            .attr('value', 'project')
//            .appendTo('#modalAddProject form');
//
//        $('<input />').attr('type', 'hidden')
//            .attr('name', 'method')
//            .attr('value', 'add')
//            .appendTo('#modalAddProject form');
//        return true;
//    });

        $("#modalAddProject .close").on('click', function(){
            $("#modalAddProject").remove();
        })

    })
})

});

// '<div id="modalAddProject" class="modal"\
//    role="dialog"\
//    aria-labelledby="myModalLabel"\
//    aria-hidden="true"\
//    data-backdrop = "false">\
//        <div class="modal-header" style="height: 20px">\
//            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
//            <h3></h3>\
//        </div>\
//        <form method="post" action="/get">\
//        <div class="modal-body" >\
//            <input class="input-xlarge" type="text"  name = "project" placeholder="enter the name of the project">\
//            </div>\
//            <div class="modal-footer">\
//                <!--<button class="btn btn-primary">Save changes</button> если не хотим чтоб кнопка закрывала окно -->\
//                <button  class="btn btn-custom" type="submit"  >Add project</button>\
//            </div>\
//        </form>\
//        </div>';