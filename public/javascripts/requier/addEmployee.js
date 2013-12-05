/**
 * Created by stepanjuk on 29.11.13.
 */

require([/*'stepa','Accordion',*/'text!./templates/addEmployee.html', 'Bogush'], function(templatadd, setAccordItem){




$(document).ready(function(){
    $("#buttonAddNewPeople").click(function(event){

        var template = templatadd;
        $(template).appendTo($("#inner-board"));
//        console.log(template);
    $('#modalAddPeople form').submit(function(){ //listen for submit event

                var formData = new FormData($(this)[0]);

                $.ajax({
                    url: '/user',
                    type: 'POST',
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (returndata) {

                        var obj = {id: returndata._id, name: returndata.name + " " + returndata.surname, status:returndata.currentStatus}
//                        console.log(returndata)
                        var item = "";
                        setAccordItem("people", obj, item);
                    }
                });

                return false;

    });

    $("#modalAddPeople .close").on('click', function(){
                $("#modalAddPeople").remove();
    });


    });

});

});