/**
 * Created by stepanjuk on 10.12.13.
 */



define (['text!../templates/employe.html', '../StorageForObjectsOnBoard', 'modalConfirm','../../thirdParty/jquery.event.drag-2.2'], function(templ, storage,Confirm){


    function transit(data,Person){
        Confirm.init(data,Person);
    }

var Person = function(idPerson) {
    var self = this;
    function  onAjaxSuccess(data){

        var idFix = Math.random().toString(36).slice(3,9);
        $.extend(self,data);
        self.id = id;
        if(parentProject) self.parentProject = parentProject;
        if(forPhoto) self.forPhoto = forPhoto;
        if(projectID || projectID === 0) self.projectID = projectID;
        self.idFix = idFix;
        self.domNode= "#"+idFix;

        self.searchName = self.name + ' ' + self.surname;

        self.render();
        storage.addObj(self);

        if(callback){
            callback(self)
        }
    }

    var id = idPerson['id'];
    var projectID = idPerson['projectID'];
    var parentProject =idPerson['parentNode'];// конфликт имен с drag-&-drop
    var forPhoto =idPerson['forPhoto'];
    var callback = idPerson['callback'];

    $.ajax({url: "/user", data:{ id: id}, async: true, success: onAjaxSuccess});
    };
    Person.bindDomNodes = function(){
        innerBoard = $('#inner-board');
    };
    Person.template = templ;
    Person.prototype  = {
        render: function(){
            if(!this.parentProject){this.parentProject = "#inner-board";}

            var divWindow =document.createElement("div");
            $(this.parentProject).append(divWindow);
            divWindow.className = "employeeWindow drag";
            divWindow.id = this.idFix;
            $(divWindow).append(Person.template);
            var self = this;
            $(Person.template).ready(function(){
                $(self.domNode).attr("data-id", self.id);
                $(self.domNode).attr("data-parentProject", self.projectID);
                if(!self.forPhoto)$(self.domNode).find(".employee-header").append('<button type="button" class="close" data-toggle="tooltip" title="remove from project" aria-hidden="true" >&times;</button>');
                $(self.domNode).find(".united .name").html(self.name+' '+self.surname);
                $(self.domNode).find(".emplPosition").html(self.position);
                $(self.domNode).find(".united img").attr("src", self.photo);
                if(!self.forPhoto)  self.setHandler();
                self.domNode = $(divWindow)
            });

        },
        setHandler: function(){
            Person.bindDomNodes();
            var self =this;
            $(this.domNode).find("button").on('click', function(event){

                if(self.projectID || self.projectID === 0){
                    for(var i in storage.storage){
                        if(storage.storage[i].id === self.id && storage.storage[i].start){
                            var re = new RegExp(self.searchName);
                            storage.storage[i].searchName = storage.storage[i].searchName.replace(re, '');
                        }
                    }

                    transit({
                        domNode:self.domNode,
                        id: self.id,
                        lastProject: self.projectID
                    },Person);
                }else{
                    $(self.domNode).remove();
                }

                storage.dropObj(self)
            });

            jQuery(function(S){

                var $div = innerBoard;
                var z = 100;
                $(self.domNode)
                    .drag("start",function( ev, dd ){
                        dd.limit = $div.offset();
                        dd.limit.bottom = dd.limit.top + $div.outerHeight() - $( this ).outerHeight();
                        dd.limit.right = dd.limit.left + $div.outerWidth() - $( this ).outerWidth();

                        return $( this ).clone()
                            .css("opacity", .75 )
                            .css('zIndex', z+10 )
                            .appendTo( this.parentNode );
                    })

                    .drag("init", function(ev, dd){
//                        dd.drop=$(".drop");
                    })
                    .drag(function( ev, dd ){
                        $('.drop').css({
                            boxShadow : "0 0px 20px rgba(0, 128, 0, 0.7)"
                        });
                        $(dd.proxy).css({
                            position: 'fixed',
                            top: Math.min( dd.limit.bottom, Math.max( dd.limit.top, dd.offsetY ) ),
                            left: Math.min( dd.limit.right, Math.max( dd.limit.left, dd.offsetX ) )
                        })
                    })
                    .drag("end",function( ev, dd ){
                        $( dd.proxy ).remove();
                        $('.drop').css({
                            boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)"
                        })
                    });

            });
        }
    };

   return Person;

});
