/** Created by stepanjuk on 28.11.13. */
define (['text!../templates/employe.html','drag&drop'], function(templ,transit){

    var Person = {
        template: templ,

        init: function(idPerson){
            var employee;
            function  onAjaxSuccess(data){
                         data.id = id;
                         if(parentProject) data.parentProject = parentProject;
                         if(forPhoto) data.forPhoto = forPhoto;



                     }
                     var id = idPerson['id'];
                     var parentProject =idPerson['parentNode'];// конфликт имен с drag-&-drop
                     var forPhoto =idPerson['forPhoto'];


                     $.get("/user",{ id: id}, onAjaxSuccess);
                     return Person.init[id];

               },

        Employee: function (data){ // избыточная сущность, пока оставлю, вообще создана для наследования методов, но еще не придумал каких
                     var idFix = Math.random().toString(36).slice(3,9);
                     this.idFix = idFix;
                     this.domNode= "#"+idFix;
                     this.name = data['name'];
                     this.surname = data['surname'];
                     this.id =data['id'];
                     this.photo = data['photo'];
                     this.position = data['position'];
                     this.parentProject = data['parentProject'];
                     this.forPhoto = data['forPhoto'];
                     this.currentStatus = data['currentStatus'];
                     this.projectList = data['projectList'];
                     this.statusList = data['statusList'];
                     this.history = data['history'];

               },

        render: function(employee){
                        if(!employee.parentProject){employee.parentProject = "#inner-board";}

                        var divWindow =document.createElement("div");
                        $(employee.parentProject).append(divWindow);
                        $(employee.parentProject).append(divWindow);
                        divWindow.className = "employeeWindow";
                        divWindow.id = employee.idFix;
                        $(divWindow).append(Person.template);

                        $(employee.template).ready(function(){
                            $(employee.domNode).attr("data-id", employee.id);
                            if(!employee.forPhoto)$(employee.domNode).find(".employee-header").append('<button type="button" class="close" data-toggle="tooltip" title="remove from project" aria-hidden="true" >&times;</button>');
                            $(employee.domNode).find(".united .name").html(employee.name+'<br/>'+employee.surname);
                            $(employee.domNode).find(".emplPosition").html(employee.position);
                            $(employee.domNode).find(".united img").attr("src", employee.photo);
                            if(!employee.forPhoto)Person.setHandler(employee);
                        });
                 },

        setHandler: function(employee){
                         $(employee.domNode).find("button").on('click', function(event){
                             $(employee.domNode).remove();
                         });

                        jQuery(function(S){
                         $(employee.domNode)
                             .drag("init", function(){
//                                 console.log(parseInt($(this.parentNode).css("margin-left")));
//                                 console.log($(this.parentNode).offset().left);

                            })
                             .drag(function( ev, dd ){
                                 $( this ).css({
                                     top: dd.offsetY-$(this.parentNode).offset().top,
                                     left: dd.offsetX-$(this.parentNode).offset().left
                                 });
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
                  }
    };

    return Person;
});

//.drop("start",function(){
//    //drag двигается над зоной drop
//    $( this ).addClass("active");
//})
//    .drop("end",function(ev,dd){
//        //drag покинул зону drop
//        $( this ).removeClass("active");
//    });