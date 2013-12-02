/**
 * Created by stepanjuk on 02.12.13.
 */

define([],function () {

$(document).ready(function(){

    $("#buttonAddNewProject").click(function(event){

    template = '<div id="modalAddProject" class="modal"\
    role="dialog"\
    aria-labelledby="myModalLabel"\
    aria-hidden="true"\
    data-backdrop = "false">\
        <div class="modal-header" style="height: 20px">\
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
            <h3></h3>\
        </div>\
        <form method="post" action="/get">\
        <div class="modal-body" >\
            <input class="input-xlarge" type="text"  name = "project" placeholder="enter the name of the project">\
            </div>\
            <div class="modal-footer">\
                <!--<button class="btn btn-primary">Save changes</button> если не хотим чтоб кнопка закрывала окно -->\
                <button  class="btn btn-custom" type="submit"  >Add project</button>\
            </div>\
        </form>\
        </div>';




    $(template).appendTo($("#inner-board"));

    $('#modalAddProject form').submit(function(){ //listen for submit event

        $('<input />').attr('type', 'hidden')
            .attr('name', 'target')
            .attr('value', 'project')
            .appendTo('#modalAddProject form');

        $('<input />').attr('type', 'hidden')
            .attr('name', 'method')
            .attr('value', 'add')
            .appendTo('#modalAddProject form');
        return true;
    });

    $("#modalAddProject .close").on('click', function(){
        $("#modalAddProject").remove();
    })

    })
})

});
