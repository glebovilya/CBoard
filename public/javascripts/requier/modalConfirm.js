/**
 * Created by Jura on 08.12.13.
 */

define(['text!./templates/addRemoveDate.html', 'StorageForObjectsOnBoard'], function (templ, storage) {
    var Confirm = {
        template: templ,
        init: function (data, Person) {
            Confirm.id = data['id'];
            Confirm.domNode = data['domNode'];

            if((data['lastProject'] || data['lastProject'] === 0) && (data['lastProject'] != "inner-board") ){

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

                if (Confirm.lastProject || Confirm.lastProject === 0) {
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
                document.getElementById('myModal').focus();

                storage.dropObj(photo);


//                console.log(Person.init[68]);

            });
        },
        setHandler: function () {
            function submitChanges(e) {
                if (($("#statusID").val()) == 0) {
                    alert("select status or close the window without saving");
                    return
                }

                if (Confirm.lastProject || Confirm.lastProject === 0) {

                    formData = {personID: Confirm.id, projectID: Confirm.lastProject, statusID: 1, leaving: 'true'};
                    $.ajax({
                        url: '/history',
                        type: 'POST',
                        data: formData,
                        success: function (returndata) {

                            if (Confirm.currentProject ||Confirm.currentProject === 0) {
                                formData = {personID: Confirm.id, projectID: Confirm.currentProject, statusID: $("#statusID").val(), leaving: 'false'};
                                $.ajax({
                                    url: '/history',
                                    type: 'POST',
                                    data: formData,
                                    async: false,
                                    success: function (returndata) {
                                        modalFooterButton.trigger('addEmpl', [returndata.person, returndata.project]/*person id*/);
                                        $(Confirm.domNode).remove();
                                        modalWindow.remove();
                                        $(".datepicker").remove();
                                    }
                                });
                            } else {
                                $(Confirm.domNode).remove();
                                modalWindow.remove();
                                $(".datepicker").remove();
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
                            modalFooterButton.trigger('addEmpl', [returndata.person, returndata.project]/*person id*/);
                            modalWindow.remove();
                            $(".datepicker").remove();
                            $(Confirm.domNode).remove();

                            for (var i in strg){
                                if (strg[i]['id'] == Confirm.id && !strg[i]['inProject'] && strg[i]['photo'] ){
                                    strg.splice(i,1);
                                }
                            }
                        }
                    })
                }
            }
            function closeModal (eventObject) {

//                $(Confirm.domNode).remove();
                modalWindow.remove();
                $(".datepicker").remove();

            }
            var modalWindow = $("#myModal");
            var modalFooterButton = $(".modal-footer button");
            var strg = storage.storage;
            $("#modalClose").on('click',closeModal);
            modalWindow.keydown(function(event){
                if(event.which ==13){
                    submitChanges(event);
                }
                if(event.which ==27){
                    closeModal(event);
                }

            });
            modalFooterButton.on('click', submitChanges);
        }
    };
    return Confirm;
});