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
//            var date = new Date($(".datepicker").val());

            var datePicker = $("input[name='startDate']")[0];

            var date = new Date(datePicker.value);
            date.setDate(date.getDate()+1); //issue on server --> date -1 day

            datePicker.value = date;

            var formData = new FormData($(this)[0]);

            $.ajax({
                url: '/project',
                type: 'POST',
//                startDate:date,
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (returndata) {
                    onAjaxSuccess(returndata);
//                    console.log(returndata)
                }
            });

            return false;

        });

        function onAjaxSuccess(data){// по приходу колбэка после сохранения нового сотрудника

//            $("#modalAddProject :input").val("");
            console.log(data)
//            var h = {"__v":0,"_id":1,"name":"NewProject","current":false,"history":[],"start":"2013-12-02T22:00:00.000Z","currentEmployees":[]}

        }


        $("#modalAddProject .close").on('click', function(){
            $("#modalAddProject").remove();
        })

    })
})

});
