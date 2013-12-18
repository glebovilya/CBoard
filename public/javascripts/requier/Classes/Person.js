/**
 * Created by stepanjuk on 10.12.13.
 */



define (['text!../templates/employe.html', '../StorageForObjectsOnBoard', 'modalConfirm','../../thirdParty/jquery.event.drag-2.2'], function(templ, storage,Confirm){

    /**
     * function cause modal window for the selected person on board
     * @param data /{id:PersonId, lastProject:attr(data-parentProject), domNode:idDomNode on which part of}/
     * @param Person /object Person for call from window Confirm and call photo/
     */
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

        self.render();
        storage.addObj(self);

        self.searchName = self.name + ' ' + self.surname;
        storage.addObj(self);

        if(callback){
//            console.log(callback);
            callback(self)
        }
    }

    var id = idPerson['id'];
    var projectID = idPerson['projectID'];
    var parentProject =idPerson['parentNode'];
    var forPhoto =idPerson['forPhoto'];
    var callback = idPerson['callback'];


    $.ajax({url: "/user", data:{ id: id}, success: onAjaxSuccess});
    };

    Person.bindDomNodes = function(){
        innerBoard = $('#inner-board');


    };
    Person.template = templ;
    /**
     * binding this attributes and this photo to template and binding template for page
     * @type {render: Function}
     */
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
                $(self.domNode).find(".united .name").html(self.name+'<br/>'+self.surname);
                $(self.domNode).find(".emplPosition").html(self.position);
                $(self.domNode).find(".united img").attr("src", self.photo);
                if(!self.forPhoto)  self.setHandler();
            });
        },
        renderNew: function(){
            if(!this.parentProject){this.parentProject = "#inner-board";}
            var self = this;
            var divWindow =document.createElement("div");
            divWindow.className = "employeeWindow drag";
            divWindow.id = this.idFix;
            $(divWindow).attr("data-id", self.id);
            $(divWindow).attr("data-parentProject", self.projectID);
            $(divWindow).append(Person.template);
            if(!this.forPhoto){var noJustPhoto = true}
            $(Person.template).find('*').each(function(){
                var element = $(this);
                console.log(element)
                if(element.attr('data-point')=='photo'){element.attr("src", self.photo)}
                if(element.attr('data-point')=='position'){element.html(self.position)}
                if(element.attr('data-point')=='name'){element.html(self.name+'<br/>'+self.surname);}
                if(noJustPhoto){
                     if(element.attr('data-point')=='header'){
                        element.append('<button type="button" class="close" data-toggle="tooltip" title="remove from project" aria-hidden="true" >&times;</button>');
                     }
                }
            });
            $(this.parentProject).append(divWindow);
            if(noJustPhoto) this.setHandler()

        },
        /**
         * set remove and drop for domNode
         */
        setHandler: function(){
            Person.bindDomNodes();
            var self =this;
            $(this.domNode).find("button").on('click', function(event){
                if(self.projectID !== undefined){
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
            // set drop
            jQuery(function(S){
                var $div = innerBoard;
                var z = 100;
                $(self.domNode)
                    .drag("start",function( ev, dd ){
                        dd.limit = $div.offset(); // set border motion
                        dd.limit.bottom = dd.limit.top + $div.outerHeight() - $( this ).outerHeight();
                        dd.limit.right = dd.limit.left + $div.outerWidth() - $( this ).outerWidth();
                        return $( this ).clone() // creation clone for authorized movement
                            .css("opacity", .75 )
                            .css('zIndex', z+10 )
                            .css('-webkit-transform', 'rotate(10deg)') /* Для Safari, Chrome, iOS */


                            .appendTo( this.parentNode );
                    })
                    .drag(function( ev, dd ){
                        $('.drop').css({
                            boxShadow : "0 0px 20px rgba(0, 128, 0, 0.7)"
                        });
                        $(dd.proxy).css({
                            position: 'fixed', //  for the correct location
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
