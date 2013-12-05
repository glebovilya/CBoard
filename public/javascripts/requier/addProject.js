/**
 * Created by stepanjuk on 02.12.13.
 */

define(['text!./templates/addProject.html'],function (templ) {

$(document).ready(function(){

    $("#buttonAddNewProject").click(function(event){

    var template = templ;





    $(template).appendTo($("#inner-board"));
        $(".datepicker").datepicker();

        $('#modalAddProject form').submit(function(){ //listen for submit event
            var date = new Date($(".datepicker").val());
            console.log(date);
            var formData = new FormData($(this)[0]);

            $.ajax({
                url: '/project',
                type: 'POST',
                startDate:date,
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


        $("#modalAddProject .close").on('click', function(){
            $("#modalAddProject").remove();
        })

    })
})

});
