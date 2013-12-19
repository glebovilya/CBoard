/*
 * Created by stepanjuk on 02.12.13.
 */

define(['text!./templates/addProject.html', 'Classes/Accordion', 'initAccordionOnPage'], function (templ, Accordion, setAccordItem) {

    $(document).ready(function () {

        function handler(event) {
            $("#buttonAddNewProject").unbind();

            function submitProject(){
                var datePicker = $("input[name='startDate']")[0];
                var date = new Date(datePicker.value);
                date.setDate(date.getDate() + 1); //issue on server --> date -1 day
                datePicker.value = date;
                var formData = {name:$("input[name='name']").val(),startDate:datePicker.value}
//                console.log(formData)
//                console.log(datePicker.value)

                if(!$("input[name='name']").val()){
                    alert('must fill in "name project"')
                    return;
                }

                $.ajax({
                    url: '/project',
                    type: 'POST',
//                startDate:date,
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (returndata) {
                        var obj = {id: returndata._id, name: returndata.name};
                        var item = "";
                        if (returndata.end) item = "Closed"
                        else item = "Open"
                        setAccordItem("projects", obj, item);
                        $("#modalAddProject input").val("");
                    }
                });
                return false;
            }

            //render modal window
            var template = templ;
            var template = $(template);
//            console.log(t.find('*'))
            template.find('*').each(function(){
                var element = $(this);
                if(element[0].tagName == 'BUTTON'){
                    if(element.attr('class')=='close'){
                        element.on('click', function () {
                            $("#buttonAddNewProject").click(handler);
                            template.remove();
                        })
                    }
                }
                if(element.attr('name')=='startDate'){
                    element.datepicker()
                }
                if(element.attr('data-point')=='submit'){
//                    console.log(element.attr('class'));
                      element.click(submitProject)
                }
            });
            $(template).appendTo($("#inner-board"));
//            var d = new Date();
//            $("div.input-append input")[0].value = (d.getMonth()+1) + "/"+d.getDate() + "/" + d.getFullYear();

//            $("#modalAddProject .close").on('click', function () {
//                $("#modalAddProject").remove();
//            })
        }

        $("#buttonAddNewProject").click(handler)
    })

});