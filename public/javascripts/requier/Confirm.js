/**
 * Created by Jura on 08.12.13.
 */

define(['text!./templates/addRemoveDate.html'], function (templ) {
    var Confirm = {
        template: templ,
        init: function (data, Person) {
            Confirm.id = data['id'];
//            console.log(Confirm.id)
            if ((data['lastProject'] != undefined ) && (data['lastProject'] != "inner-board")) {
                Confirm.lastProject = data['lastProject'];
            } else {
                Confirm.lastProject = false;
            }
            if (data['currentProject']) {
                Confirm.currentProject = data['currentProject'];
            } else {
                Confirm.currentProject = false;
            }

            Confirm.render(Person);
            Confirm.setHandler();

        },
        render: function (Person) {
            $(Confirm.template).appendTo($("#inner-board"));


            $("#formConfirmDate").ready(function () {

                if (Confirm.lastProject) {
                    $.ajax({url: '/project',
                        type: 'GET',
                        data: {id: Confirm.lastProject},
                        success: function (returndata) {
                            $("#lastProject").html('leaves the project:  ' + returndata.name)
                        }
                    });
                } else {
                    $("#lastProject").html('leaves the category of employed workers');
                }
                if (Confirm.currentProject) {
                    $.ajax({url: '/project',
                        type: 'GET',
                        async: false,
                        data: {id: Confirm.currentProject},
                        success: function (returndata) {
                            $("#currentProject").html('assigned to the project:  ' + returndata.name)
                        }
                    });
                } else {
                    $("#currentProject").html('joined not employed persons');
                    $("#statusID").remove();
                }


                $(".datepicker").datepicker();


                var photo = new Person({
                    id: Confirm['id'],
                    forPhoto: 'true',
                    parentNode: "#windowForPhoto"
                });


//                console.log(Person.init[68]);

            });
        },
        setHandler: function () {
            $("#modalClose").on('click', function () {
                $(".datepicker").remove();
                $("#myModal").remove();

            });

            $(".modal-footer button").on('click', function (e) {
                if (($("#statusID").val()) == 0) {
                    alert("select status or close the window without saving");
                    return
                }

                if (Confirm.lastProject) {
                    formData = {personID: Confirm.id, projectID: Confirm.lastProject, statusID: 1, leaving: 'true'};
                    $.ajax({
                        url: '/history',
                        type: 'POST',
                        data: formData,
                        success: function () {
                            if (Confirm.currentProject) {
                                formData = {personID: Confirm.id, projectID: Confirm.currentProject, statusID: $("#statusID").val(), leaving: 'false'};
                                $.ajax({
                                    url: '/history',
                                    type: 'POST',
                                    data: formData,
                                    async: false,
                                    success: function (returndata) {
                                        $(".modal-footer button").trigger('addEmpl', [returndata.person]/*person id*/);
                                        $(".datepicker").remove();
                                        $("#myModal").remove();


                                    }
                                });
                            } else {
                                $(".datepicker").remove();
                                $("#myModal").remove();

                            }
                        }
                    });
                } else {
                    formData = {personID: Confirm.id, projectID: Confirm.currentProject, statusID: $("#statusID").val(), leaving: 'false'};
                    $.ajax({
                        url: '/history',
                        type: 'POST',
                        data: formData,
                        async: false,
                        success: function (returndata) {
                            $(".modal-footer button").trigger('addEmpl', [returndata.person]/*person id*/);
                            $(".datepicker").remove();
                            $("#myModal").remove();

                        }
                    })
                }

            });

        }
    };
    return Confirm;
});