/**
 * Created by stepanjuk on 10.12.13.
 */



define (['templates', '../StorageForObjectsOnBoard',/* '../modalConfirm',*/'../Confirm','../../thirdParty/jquery.event.drag-2.2'], function(templates, storage,Confirm){
//define (['text!../templates/employe.html', '../StorageForObjectsOnBoard',/* '../modalConfirm',*/'../Confirm','../../thirdParty/jquery.event.drag-2.2'], function(templateemployee, storage,Confirm){

    /**
     * function cause modal window for the selected person on board
     * @param data /{id:PersonId, lastProject:attr(data-parentProject), domNode:idDomNode on which part of}/
     * @param Person /object Person for call from window Confirm and call photo/
     */
    function transit(data,Person){
      new Confirm(data,Person);
    }
    var positions;

    $.ajax({
        url: '/position',
        success: function(data){
            positions = data
        }
    });



var Person = function(idPerson) {
    var self = this;
    this.inProject = false;

    function  onAjaxSuccess(data){

        var idFix = Math.random().toString(36).slice(3,9);
        $.extend(self,data);

        for(var i in positions) {
            if(self.position == positions[i]._id){
                self.position = positions[i].name
            }
        }

        self.id = id;
        if(parentProject) self.parentProject = parentProject;
        if(forPhoto) self.forPhoto = forPhoto;
        if(projectID || projectID === 0) self.projectID = projectID;
        self.idFix = idFix;
        self.domNode= "#"+idFix;

        self.render();
        self.searchName = self.name + ' ' + self.surname;
        storage.addObj(self);

        if(callback){
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
    Person.template = templates.templateEmployee;
    /**
     * binding this attributes and this photo to template and binding template for page
     * @type {render: Function}
     */
    Person.prototype  = {

        render: function(){
            if(!this.parentProject){this.parentProject = "#inner-board";}
            var self = this;
            if(!this.forPhoto){var noJustPhoto = true}
            var divWindow =document.createElement("div");
            divWindow.className = "employeeWindow drag";
            divWindow.id = this.idFix;
            $(divWindow).attr("data-id", self.id);
            $(divWindow).attr("data-parentProject", self.projectID);
            $(divWindow).append(Person.template);
            $(divWindow).find('*').each(function(){
                var element = $(this);
                if(element.attr('data-point')=='photo'){element.attr("src", self.photo)}
                if(element.attr('data-point')=='position'){element.html(self.position)}
                if(element.attr('data-point')=='name'){element.html(self.name+' '+self.surname);}
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
         * set remove and drag for domNode
         */
        setHandler: function(){
            Person.bindDomNodes();
            var self =this;
            $(this.domNode).find("button").on('click', function(event){
                if(self.projectID !== undefined){
                    for(var i in storage.storage){
                        if(storage.storage[i].id === self.projectID && storage.storage[i].devs /*this needs to check if obj is a Project*/){
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
            // set drag - ability to drag person
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
                            .css('-webkit-transform', 'rotate(10deg)') /* for Safari, Chrome, iOS */


                            .appendTo( this.parentNode );
                    })
                    .drag(function( ev, dd ){ //illuminant target drop
                        $('.drop').css({
                            boxShadow : "0 0px 20px rgba(0, 128, 0, 0.7)"
                        });
                        $(dd.proxy).css({
                            position: 'fixed', //  for the correct location under the cursor
                            top: Math.min( dd.limit.bottom, Math.max( dd.limit.top, dd.offsetY ) ),
                            left: Math.min( dd.limit.right, Math.max( dd.limit.left, dd.offsetX ) )
                        })
                    })
                    .drag("end",function( ev, dd ){// turn off illuminant
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
