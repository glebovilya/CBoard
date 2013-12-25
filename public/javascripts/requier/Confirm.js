/**
 * Created by stepanjuk on 24.12.13.
 */
define(['text!./templates/addRemoveDate.html', 'StorageForObjectsOnBoard'], function (templateaddRemoveDate, storage) {

    var toggleIcon = function (personID, add) {
        var item = $('li[data-point-id='+personID+']');
        if(!add){
            item.find('i.icon-fire').remove()
        }
        else {
            $.ajax({
                url: "/user",
                data:{ id: personID},
                success: function(person){
                    if(person['inSkillUpFrom']) {
                        var dateNow = new Date();
                        var inSkillUpFrom = new Date(person['inSkillUpFrom']);
                        var msToDays = 1000*60*60*24;

                        var deferenceInDays = (dateNow - inSkillUpFrom)/msToDays
                        if(deferenceInDays >= 14) {
                            item.find('a').prepend('<i class=" icon-fire" style="float: right"></i>')
                        }
                    }
                }
            })
        }
    };

    var Confirm = function(data, Person){
        this.template = templateaddRemoveDate;
        this.init(data, Person);

        this.render();


    };
    Confirm.prototype.render =  function(){
        var self = this;
        var template = this.template;
        template = $(template);
        template.find('*').each(function(){
            var element = $(this);
            var point = element.attr('data-point');
            var renderEvent = element.attr('data-event');
            if(point) {
                self[point] = element;
            }
            if(renderEvent){

                self.attachEvent(element,renderEvent);
            }
        });

        $(template).appendTo($("#inner-board"));
        this.template = template;
        this.form =  $(template).find('input');

        var cover =document.createElement('div');
        document.body.appendChild(cover);
        $(cover).addClass('cover');
        this.cover = cover;

        this.setHandler();
    };
    Confirm.prototype.attachEvent = function( element, renderEvent){
        var self = this;
        var arrRenderEvent = renderEvent.split(','),
            parts = [],
            evtName = "",
            methodName = "";
        $.each(arrRenderEvent, function(idx, definition) {
            // split definition to [DOMEventName,DOMEventHandler] pair
            parts = definition.split(':');
            evtName = parts[0];
            methodName = parts[1];

            // bind Widget method to DOMElement event
            element.on(evtName, $.proxy(self[methodName], self))
        })
    };



    Confirm.prototype.init = function(data,Person){
        var self = this;
        this.currentProject = null;
        this.lastProject = null;
        // get property person and project
        console.log(data)
        $.extend(this,data);
//        console.log(data)
        if((this['lastProject'] || this['lastProject'] === 0) && (this['lastProject'] != "inner-board") ){
            this.lastProject = this['lastProject'];
        }

        //identify name  last and current project
        if ((this.lastProject) || this.lastProject === 0) {
            $.ajax({url: '/project',
                type: 'GET',
                data: {id: self.lastProject},
                success: function (returndata) {
                    $(self.forLastProject).html('leaves the project:  ' + returndata.name);
                }
            });
        } else {
            $(self.forLastProject).html('leaves the category of employed workers');

        }

        if (this.currentProject) {
            $.ajax({url: '/project',
                type: 'GET',
                data: {id: this.currentProject},
                success: function (returndata) {
                    $(self.forCurrentProject).html('assigned to the project:  ' + returndata.name)
                }
            });
        } else {

            $(self.forCurrentProject).html('joined not employed persons');

        }

        // get photo person
        var photo = new Person({
            id: this.id,
            forPhoto: 'true',
            parentNode: "#windowForPhoto",
            callback: storage.dropObj
        });


    };
    Confirm.prototype.removeDomNode = function(){
        $(this.template).remove();
        this.cover.remove();
    };
    Confirm.prototype.setHandler = function(){
        var self = this;
        console.log(this)
        $('body').one('keydown',function(event){
            if(event.which ==13){
                self.submitData();
            }
            if(event.which ==27){
                self.removeDomNode();
            }
        });

        if(this.datePicker)this.datePicker.datepicker();
    };

    Confirm.prototype.submitData = function(e){
        var self = this;
        var strg = storage.storage;
//            console.log(self)


        if ((this.lastProject) || this.lastProject === 0) {
            if($(this.datePicker).val()){
                var date = new Date($(self.datePicker).val());
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
                        var  formData = {personID: self.id, projectID: self.currentProject, statusID: 1, leaving: 'false', date:date};
                        console.log(formData)
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
                                $(self.modalFooterButton).trigger('addEmpl', [returndata.person, returndata.project]/*person id*/);
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
            formData = {personID: self.id, projectID: 4, statusID: 3, leaving: 'false',date:date};
//            console.log(formData)
            $.ajax({
                url: '/history',
                type: 'POST',
                data: formData,
                success: function (returndata) {
                    $(self.modalFooterButton).trigger('addEmpl', [returndata.person, returndata.project]/*person id*/);
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
