/**
 * Created by Jura on 08.12.13.
 */

define(['text!./templates/addRemoveDate.html'], function(templ){
    var Confirm  = {
        template: templ,
        init: function(data, Person){

            Confirm.id = data['id'];
            if((data['lastProject']) && (data['lastProject'] != "inner-board") ){
                Confirm.lastProject = data['lastProject'];
            }else{
                Confirm.lastProject = "freeShooter";
            }
            if(data['currentProject']){
                Confirm.currentProject = data['currentProject'];
            }else{
                Confirm.currentProject = "freeShooter";
            }

            Confirm.render(Person);
            Confirm.setHandler()
        },
        render: function(Person){
            $(Confirm.template).appendTo($("#inner-board"));



            $("#formConfirmDate").ready(function(){
                if(Confirm.lastProject !="freeShooter"){
                    $.ajax({url: '/project',
                        type: 'GET',
                        data: {id:Confirm.lastProject},
                        success: function (returndata){
                            $("#lastProject").html('leaves the project:  '+returndata.name)
                        }
                    });
                }else{
                $("#currentProject").html('leaves the category of employed workers');
            }
                if(Confirm.currentProject !="freeShooter"){
                    $.ajax({url: '/project',
                        type: 'GET',
                        data: {id:Confirm.currentProject},
                        success: function (returndata){
                            $("#currentProject").html('assigned to the project:  '+returndata.name)
                        }
                    });
                }else{
                    $("#currentProject").html('joined not employed persons');
                    $("#statusID").remove();
                }




                $(".datepicker").datepicker();


                Person.init({
                    id: Confirm['id'],
                    forPhoto: 'true',
                    parentNode: "#windowForPhoto"
                });


//                console.log(Person.init[68]);

            });
        },
        setHandler: function(){
            $("#modalClose").on('click', function(){
                $("#myModal").remove();
            });

            $(".modal-footer button").on('click', function(){
                if(($("#statusID").val())==0){
                    alert("select status or close the window without saving");
                    return
                }

                if(Confirm.lastProject !="freeShooter"){
                    formData ={personID: Confirm.id, projectID:Confirm.lastProject, statusID:1, leaving: 'true'};
                    $.ajax({
                        url: '/history',
                        type: 'POST',
                        data: formData,
                        success: function (returndata) {
                            if(Confirm.currentProject !="freeShooter"){
                                formData ={personID: Confirm.id, projectID:Confirm.currentProject, statusID: $("#statusID").val(), leaving: 'false'};
                                $.ajax({
                                    url: '/history',
                                    type: 'POST',
                                    data: formData,
                                    success: function (returndata) {
                                        $("#myModal").remove();
                                        $(".datepicker").remove()
                                    }
                                });
                            }else{
                                $("#myModal").remove();
                                $(".datepicker").remove()
                            }
                        }
                    });
                } else {
                    formData ={personID: Confirm.id, projectID:Confirm.currentProject, statusID:$("#statusID").val(), leaving: 'false'};
                    $.ajax({
                        url: '/history',
                        type: 'POST',
                        data: formData,
                        success: function (returndata) {
                            $("#myModal").remove();
                            $(".datepicker").remove()
                        }
                    })
                }

            });

        }
    };
        return Confirm;
});