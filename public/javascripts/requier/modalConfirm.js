// Created by Jura on 08.12.13.

define(['text!./templates/addRemoveDate.html', 'StorageForObjectsOnBoard', 'Classes/Person'], function (templ, storage, Person) {
    /**
     *
     * @type {{template: *, init: Function, render: Function, bindDomNodes: Function, setHandler: Function}}
     */
    var Confirm = {
        template: templ,
        /**
         * domNode:self.domNode,
         lastProject: self.projectID
         * @param data {id: attr(data-id),lastProject: attr(data-parentproject),currentProject: setProject after drag,domNode:domNodeId}
         * @param Person - object Person fully for insert photo in modal
         */
        init: function (data, Person) {
            Confirm.currentProject = false;
            Confirm.lastProject = false;
            $.extend(this,data);
            if((Confirm['lastProject'] || Confirm['lastProject'] === 0) && (Confirm['lastProject'] != "inner-board") ){
                Confirm.lastProject = Confirm['lastProject'];
            } else {
                Confirm.lastProject = false;
            }
            if (!Confirm.currentProject){Confirm.currentProject = false;}
            Confirm.render(Person);
            Confirm.setHandler();
        },
        // insert last and current project and photo
        render: function (Person) {
            Confirm.bindDomNodes();
            $(Confirm.template).appendTo(innerBoard);
            formConfirmDate.ready(function () {


                if (Confirm.lastProject !== undefined && Confirm.lastProject !== false) {

                    $.ajax({url: '/project',
                        type: 'GET',
                        data: {id: Confirm.lastProject},
                        success: function (returndata) {
                            $(lastProject).html('leaves the project:  ' + returndata.name)
                        }
                    });
                } else {
                    $(lastProject).html('leaves the category of employed workers');
                }

                if (Confirm.currentProject) {


                    $.ajax({url: '/project',
                        type: 'GET',
                        data: {id: Confirm.currentProject},
                        success: function (returndata) {
                            $(currentProject).html('assigned to the project:  ' + returndata.name)
                        }
                    });
                } else {

                    $(currentProject).html('joined not employed persons');
                   $(statusId).remove();
                }

                $(datePicker).datepicker();

                var photo = new Person({
                    id: Confirm['id'],
                    forPhoto: 'true',
                    parentNode: "#windowForPhoto",
                    callback: storage.dropObj
                });

                document.getElementById('myModal').focus();
            });
            var cover =document.createElement('div');
            document.body.appendChild(cover);
            $(cover).addClass('cover');
            this.cover = cover;

        },
        bindDomNodes: function() {
                          innerBoard = $("#inner-board");
                          modalWindow = $("#myModal");
                          modalFooterButton = $(".modal-footer button");
                          formConfirmDate = $("#formConfirmDate");
                          modalClose = $("#modalClose");
                          statusId = "#statusID";
                          datePicker = "#datepicker";
                          currentProject = "#currentProject";
                          lastProject = "#lastProject";
        },
        /**
         * set remove modal and submit data in db "history"
         */
        setHandler: function () {
                            Confirm.bindDomNodes();
                            function submitChanges(e) {
                                if ($(statusId).val() == 0) {
                                    alert("select status or close the window without saving");
                                    return
                                }

                                if (Confirm.lastProject !== undefined) {
                                    formData = {personID: Confirm.id, projectID: Confirm.lastProject, statusID: 1, leaving: 'true'};
                                    $.ajax({
                                        url: '/history',
                                        type: 'POST',
                                        data: formData,
                                        success: function (returndata) {

                                            if (Confirm.currentProject ||Confirm.currentProject === 0) {
                                                formData = {personID: Confirm.id, projectID: Confirm.currentProject, statusID: $(statusId).val(), leaving: 'false'};
                                                $.ajax({
                                                    url: '/history',
                                                    type: 'POST',
                                                    data: formData,
                                                    async: false,
                                                    success: function (returndata) {
                                                        for (var i in strg){
                                                            if (strg[i]['id'] == Confirm.id && !strg[i]['inProject'] && strg[i]['photo'] ){
                                                                console.log(strg[i])
                                                                strg.splice(i,1);
                                                            }
                                                        }
                                                        modalFooterButton.trigger('addEmpl', [returndata.person, returndata.project]/*person id*/);
                                                        $(Confirm.domNode).remove();
                                                        Confirm.cover.remove();
                                                        modalWindow.remove();
                                                        $(datePicker).remove();
                                                    }
                                                });
                                            } else {
                                                $(Confirm.domNode).remove();
                                                Confirm.cover.remove();
                                                modalWindow.remove();
                                                $(datePicker).remove();
                                            }
                                        }
                                    });
                                } else {
                                    formData = {personID: Confirm.id, projectID: Confirm.currentProject, statusID: $(statusId).val(), leaving: 'false'};
                                    $.ajax({
                                        url: '/history',
                                        type: 'POST',
                                        data: formData,
//                                        async: false,
                                        success: function (returndata) {
                                            modalFooterButton.trigger('addEmpl', [returndata.person, returndata.project]/*person id*/);
                                            modalWindow.remove();
                                            $(datePicker).remove();
                                            $(Confirm.domNode).remove();
                                            Confirm.cover.remove();
                                        }
                                    })
                                }
                            }
                            function closeModal (eventObject) {

                                modalWindow.remove();
                                $(datePicker).remove();
                                Confirm.cover.remove();
                            }

            var strg = storage.storage;
            modalClose.on('click',closeModal);
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