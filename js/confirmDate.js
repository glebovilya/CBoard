/**
 * Created by stepanjuk on 02.12.13.
 */

require(['newEmployee, bootstrap-datepicker'], function(empl){


    function confirmDate(event, employee){




var template = ' <div class = "employee" id = "formConfirmDate">\
    <div class="employeeWindow ">\
        <div class="employee-header" >\
            <div >branch</div>\
            <button type="button" class="close" data-toggle="tooltip" title="remove from project"  aria-hidden="true" >&times;</button>\
        </div>\
         <div class="modal-body" >\
    <div class = "row">\
    <div class="span3">\
        <input class="input-xlarge" type="text" placeholder="enter the name of the project">\
            <input class="input-xlarge" type="text" placeholder="enter the name of the project">\
                <div class="input-append date" id="add" data-date="12-02-2012" data-date-format="dd-mm-yyyy">\
                    <input  size="16"   type="text"  class="datepicker" placeholder="Date of joining the project">\
                        <span class="add-on"><i class="icon-th"></i></span>\
                    </div>\
                    <div class="input-append date" id="remove" data-date="12-02-2012" data-date-format="dd-mm-yyyy">\
                        <input  size="16"  type="text" class="datepicker" placeholder="Release date of the project">\
                            <span class="add-on"><i class="icon-th"></i></span>\
                        </div>\
                    </div>\
                    <div class=" span1 pull-right">\
                    </div>\
                </div>\
                <div class="modal-footer">\
                    <button class="btn btn-custom" data-dismiss="modal" aria-hidden="true">Save changes</button>\
                </div>\
</div>';



        $("#formConfirmDate").ready(function(){

        })

    }
});