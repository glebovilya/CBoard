/**
 * Created by stepanjuk on 28.11.13.
 */
define (['text!../templates/employe.html'], function(templ){

    var Person = {
        template: templ,

        init: function(idPerson){
                     function  onAjaxSuccess(data){
                         data.id = id;
                         if(parentNode) data.parentNode = parentNode;
                         if(forPhoto) data.forPhoto = forPhoto;
                         var employee = new Person.Employee(data);
                         Person.render(employee);
                     }

                     var id = idPerson['id'];
                     var parentNode =idPerson['parentNode'];
                     var forPhoto =idPerson['forPhoto'];

                     $.get("/user",{ id: id}, onAjaxSuccess);
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
                     this.parentNode = data['parentNode'];
                     this.forPhoto = data['forPhoto'];
               },

        render: function(employee){
                        if(!employee.parentNode){employee.parentNode = ("body");}

                        var divWindow =document.createElement("div");
                        $(employee.parentNode).append(divWindow);
                        $(employee.parentNode).append(divWindow);
                        divWindow.className = "employeeWindow";
                        divWindow.id = employee.idFix;
                        $(divWindow).append(Person.template);

                        $(employee.template).ready(function(){
                            $(employee.domNode).attr("dataId", employee.id);
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
                         $(employee.domNode).drag(function( ev, dd ){
                              $( this ).css({
                                 top: dd.offsetY,
                                 left: dd.offsetX
                              });
                         });
                            $(employee.domNode).drag('init',function (ev, dd) {
                                $(dd.drag).parents('div:eq(0)').css('position', 'absolute');
//                              $.post('/user/:id', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){

                                var self=this;
                                $.post('/user/'+$(this).attr("dataId"), {}, function(ell){
                                    console.log("id="+$(self).attr("dataId") );
                                });
                            });
                            $(employee.domNode).drag('end', function (ev, dd) {
//                                 $.post('/get', {target: 'person', id: 1}, function(ell){
                                console.log(dd.drop)

                            });
//                            $(".drop").drop(function(){
//                                $( this ).toggleClass('dropped');
//
//                            });
                        });

                  }
    };
    return Person;
});
