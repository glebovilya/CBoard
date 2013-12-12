/**
 * Created by stepanjuk on 10.12.13.
 */
define (['text!../templates/employe.html','../drag&drop'], function(templ,dragDrop){


var Person = function(idPerson) {
    var self = this;
    function  onAjaxSuccess(data){
        var idFix = Math.random().toString(36).slice(3,9);
        data.id = id;
        if(parentProject) self.parentProject = parentProject;
        if(forPhoto) selfforPhoto = forPhoto;
        self.idFix = idFix;
        self.domNode= "#"+idFix;
        self.name = data['name'];
        self.surname = data['surname'];
        self.id =data['id'];
        self.photo = data['photo'];
        self.position = data['position'];
        self.currentStatus = data['currentStatus'];
        self.projectList = data['projectList'];
        self.statusList = data['statusList'];
        self.history = data['history'];

//        Person.prototype.render();
        self.render();
    }

    var id = idPerson['id'];

    var parentProject =idPerson['parentNode'];// конфликт имен с drag-&-drop
    var forPhoto =idPerson['forPhoto'];

    $.ajax({url: "/user", data:{ id: id}, async: false, success: onAjaxSuccess});
//    return self
    };
    Person.template = templ;
    Person.prototype  = {
        render: function(){
            if(!this.parentProject){this.parentProject = "#inner-board";}

            var divWindow =document.createElement("div");
            $(this.parentProject).append(divWindow);
            $(this.parentProject).append(divWindow);
            divWindow.className = "employeeWindow drag";
            divWindow.id = this.idFix;
            $(divWindow).append(Person.template);
            var self = this;
            $(Person.template).ready(function(){
                $(self.domNode).attr("data-id", self.id);
                if(!self.forPhoto)$(self.domNode).find(".employee-header").append('<button type="button" class="close" data-toggle="tooltip" title="remove from project" aria-hidden="true" >&times;</button>');
                $(self.domNode).find(".united .name").html(self.name+'<br/>'+this.surname);
                $(self.domNode).find(".emplPosition").html(self.position);
                $(self.domNode).find(".united img").attr("src", self.photo);
                if(!self.forPhoto)  self.setHandler();

            });

        },
        setHandler: function(){
            var self =this;
            $(this.domNode).find("button").on('click', function(event){

                $(self.domNode).remove();
            });
//            dragDrop();
//
            jQuery(function(S){
//                console.log(this);
                $(self.domNode)
                    .drag("init", function(ev, dd){
//                                 console.log(parseInt($(this.parentNode).css("margin-left")));
//                                 console.log($(this.parentNode).offset().left);
                        $(this).css({
                            position: 'fixed',
                            top: dd.offsetY,
                            left: dd.offsetX
                        })

                        console.log(dd)
                    })
                    .drag(function( ev, dd ){
                        $( this ).css({
                            top: dd.offsetY,
                            left: dd.offsetX
//                            top: dd.originalY,
//                            left: dd.originalX
                        });
                        console.log(this)
                        console.log(dd);
                    });
                $('.drop')
                    .drop(function (ev,dd){
                        //drag ??????? ??????
//                                $( this ).toggleClass('dropped');
//                                  console.log(dd.target.id);//??????
//                                  console.log($(dd.drag).attr("data-id"));//????????
//                                  console.log(dd.drag.parentNode.id);//?????



                        transit({
                            domNode:dd.drag,
                            id: $(dd.drag).attr("data-id"),
                            lastProject: dd.drag.parentNode.id,
                            currentProject: dd.target.id,
                            action: 'transfer'
                        },Person);
                    })

            });
        },
        green: function(){

        }
    }

   return Person;

});
