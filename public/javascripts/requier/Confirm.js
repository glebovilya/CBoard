/**
 * Created by stepanjuk on 24.12.13.
 */
define(['Modal','text!./templates/addRemoveDate.html'], function (Modal,templateaddRemoveDate) {


    var Confirm = function(data, Person){
        var modal = new Modal({template:templateaddRemoveDate,url:'/project'});
        this.init(modal, data, Person);
    };



    Confirm.prototype.init = function (modal, data, Person) {
//            this.render();
//            console.log(data)
            // get property Modal
            $.extend(this,modal);
            this.currentProject = null;
            this.lastProject = null;
            // get property person and project
            $.extend(this,data);
            if((this['lastProject'] || this['lastProject'] === 0) && (this['lastProject'] != "inner-board") ){
                this.lastProject = this['lastProject'];
            }
            this.formationModal(Person)
        };
    Confirm.prototype.formationModal = function(Person){
            var self = this;
            //identify name  last and current project
            if ((this.lastProject) || this.lastProject === 0) {
//                console.log(this)
                $.ajax({url: '/project',
                    type: 'GET',
                    data: {id: self.lastProject},
                    success: function (returndata) {
                        $(self.forLastProject).html('leaves the project:  ' + returndata.name);
                    }
                });
            } else {
                $(this.forLastProject).html('leaves the category of employed workers');
            }

            if (this.currentProject) {
                $.ajax({url: '/project',
                    type: 'GET',
                    data: {id: this.currentProject},
                    success: function (returndata) {
                        $(this.forCurrentProject).html('assigned to the project:  ' + returndata.name)
                    }
                });
            } else {
                $(this.forCurrentProject).html('joined not employed persons');
                $(this.statusId).remove();
            }

            // get photo person
            var photo = new Person({
                id: this.id,
                forPhoto: 'true',
                parentNode: "#windowForPhoto"
//                callback: storage.dropObj
            });

            console.log(self)
        };
    Confirm.submitData = function(e){
            var self = this;
            console.log(self)
            if ($(statusId).val === 0) {
                $(this.ahtung).html('select status');
                return
            }

            if ((this.lastProject) && this.lastProject === 0) {

                if($(this.datePicker).val()){
                    var date = new Date($(datePicker).val());
                    date.setDate(date.getDate() + 1); //issue on server --> date -1 day
                }
                var formData = {personID: this.id, projectID: this.lastProject, statusID: 1, leaving: 'true', date:date};


                $.ajax({
                    url: '/history',
                    type: 'POST',
                    data: formData,
                    success: function (returndata) {
                        toggleIcon(self.id, true);
                        if (self.currentProject ||self.currentProject === 0) {
                            if($(self.datePicker).val()){
                                var date = new Date($(self.datePicker).val());
                                date.setDate(date.getDate() + 1); //issue on server --> date -1 day
                            }
                            var  formData = {personID: self.id, projectID: self.currentProject, statusID: self.statusId, leaving: 'false', date:date};
                            $.ajax({
                                url: '/history',
                                type: 'POST',
                                data: formData,
                                async: false,
                                success: function (returndata) {
                                    for (var i in strg){
                                        if (strg[i]['id'] == self.id && !strg[i]['inProject'] && strg[i]['photo'] ){
                                            strg.splice(i,1);
                                        }
                                    }
                                    modalFooterButton.trigger('addEmpl', [returndata.person, returndata.project]/*person id*/);
                                    $(self.domNode).remove();
                                    self.removeDomNode();
                                }
                            });
                        } else {
                            $(self.domNode).remove();
                            self.removeDomNode();
                        }
                    }
                });
            } else {
                if($(self.datePicker).val()){
                    var date = new Date($(self.datePicker).val());
                    date.setDate(date.getDate() + 1); //issue on server --> date -1 day
                }
                formData = {personID: self.id, projectID: self.currentProject, statusID: self.statusId, leaving: 'false',date:date};
                $.ajax({
                    url: '/history',
                    type: 'POST',
                    data: formData,
                    success: function (returndata) {
                        modalFooterButton.trigger('addEmpl', [returndata.person, returndata.project]/*person id*/);
                        modalWindow.remove();
                        $(self.domNode).remove();
                        self.removeDomNode();
                        toggleIcon(self.id, false);
                    }
                })
            }

        }

//    var confirm = new Confirm({id: 1, lastProject: 1});

    return Confirm ;

});
