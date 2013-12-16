/*
 * Created by stepanjuk on 02.12.13.
 */

define(['text!./templates/addProject.html', 'Classes/Accordion', 'initAccordionOnPage'], function (templ, Accordion, setAccordItem) {

    $(document).ready(function () {

        $("#buttonAddNewProject").click(function (event) {

            var template = templ;


            $(template).appendTo($("#inner-board"));
            $(".input-append input").datepicker();
            var d = new Date();
            $("div.input-append input")[0].value = (d.getMonth()+1) + "/"+d.getDate() + "/" + d.getFullYear();




            $('#modalAddProject form').submit(function () { //listen for submit event
//            var date = new Date($(".datepicker").val());

                var datePicker = $("input[name='startDate']")[0];

                var date = new Date(datePicker.value);
                date.setDate(date.getDate() + 1); //issue on server --> date -1 day

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

                        var obj = {id: returndata._id, name: returndata.name}
                        var item = "";
                        if (returndata.end) item = "Closed"
                        else item = "Open"
                        setAccordItem("projects", obj, item);
                        $("#modalAddProject input").val("");
                    }
                });
                return false;

            });

            $("#modalAddProject .close").on('click', function () {
                $(".datepicker").remove();
                $("#modalAddProject").remove();
            })

        })
    })

});