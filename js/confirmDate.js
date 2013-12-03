/**
 * Created by stepanjuk on 02.12.13.
 */

require(['text!../templates/addRemoveDate.html','newEmployee', 'bootstrap-datepicker'], function(templ){







var template = '<div id="myModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
    <div class="modal-header" style="height: 20px">\
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
        <h3 id="myModalLabel"></h3>\
    </div>\
        <div class="modal-body" >\
        <div class = "row-fluid">\
            <div class="span3">\
            <form class="form-horizontal" action="" method="post">\
                <input class="input-xlarge" type="text" placeholder="enter the name of the project">\
                <div></br></div>\
                    <input class="input-xlarge" type="text" placeholder="enter the name of the project">\
                    <div></br></div>\
                        <div class="input-append date" id="add"  data-date-format="dd-mm-yyyy">\
                    <input  size="16"  class = "datepicker" data-provide="datepicker" type="text"  placeholder="Date of joining the project">\
                                <span class="add-on "><i class="icon-th"></i></span>\
                                <div></br></div>\
            </div>\
            </form>\
                            </div>\
                           <div class=" span3 pull-right windowForPhoto">\
                            </div>\
                        </div>\
                        <div class="modal-footer">\
                            <!--<button class="btn btn-primary">Save changes</button> если не хотим чтоб кнопка закрывала окно -->\
                            <button class="btn btn-custom" data-dismiss="modal" aria-hidden="true">Save changes</button>\
                        </div>\
                    </div>';









var templateEmployee = ' <div class = "employee">\
        <div class="employeeWindow ">\
            <div class="employee-header" >\
                <div >position</div>\
                <button type="button" class="close" data-toggle="tooltip" title="remove from project"  aria-hidden="true" >&times;</button>\
            </div>\
            <div class="employee-body">\
                <div class="united" >\
                    <img src=' + empl.photo + ' alt="">\
                        <div class= "name" >'+empl.name +'</br>'+empl.surname +'</div>\
                </div>\
            </div>\
            <div class="employee-footer">\
            </div>\
        </div>\
        </div>';





    $(template).appendTo($("#inner-board"));




        $("#formConfirmDate").ready(function(){
            console.log("yep");
             $(".datepicker").datepicker();

            $(templateEmployee).appendTo($(".windowForPhoto"));


        });
        $("#myModal").ready(function(){

        });


});