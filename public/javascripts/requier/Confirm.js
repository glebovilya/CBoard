/**
 * Created by Jura on 08.12.13.
 */

define([/*'Classes/Person',*/'text!./templates/addRemoveDate.html'], function(/*Person,*/templ){
    var Confirm  = {
        template: templ,
        init: function(data, Person){
            Confirm.domNode = data['domNode'];
            Confirm.id = data['id'];
            if(data['lastProject']){
//                Confirm.lastProject = data['lastProject'];
                Confirm.lastProject = 1;
            }else{
                Confirm.lastProject = "freeShooter";
            }
            if(data['currentProject']){
//                Confirm.currentProject = data['currentProject'];
                Confirm.currentProject = 2;
            }else{
                Confirm.currentProject = "freeShooter";
            }

            Confirm.render(Person);
            Confirm.setHandler()
        },
        render: function(Person){
            $(Confirm.template).appendTo($("#inner-board"));
            $("#formConfirmDate").ready(function(){

                $("#lastProject").val(Confirm['lastProject']);
                $("#currentProject").val(Confirm['currentProject']);


                $(".datepicker").datepicker();
                Person.init({
                    id: Confirm['id'],
                    forPhoto: 'true',
                    parentNode: "#windowForPhoto"
                });
            });
        },
        setHandler: function(){
            $("#modalClose").on('click', function(){
                $("#myModal").remove();
            });

            $(".modal-footer button").on('click', function(){
                formData ={personID: '73', projectID: '1', statusID: '3', leaving: 'true'};
                $.ajax({
                   url: '/history',
                   type: 'POST',
                   data: formData,
                   async: false,
                   cache: false,
                   contentType: false,
                   processData: false,
                   success: function (returndata) {
                           // чо делать с ответом?
                             $("#myModal").remove();
                         }
                });

//                post('/history', //{personID: 'num', projectID: 'num', statusID: 'num', leaving: 'Boolean'(optional date: 'date')}
//               if(Confirm['lastProject'] !='free' && Confirm['currentProject'] !='free'){
//                   $.ajax({
//                       url: '/history',
//                       type: 'POST',
//                       data: formData,
//                       personID: Confirm['id'],
//                       projectID: Confirm['lastProject'],
//                       leaving: 'false',
////                       async: false,
////                       cache: false,
//                       contentType: false,
//                       processData: false,
//                       success: function (returndata) {
//                           // чо делать с ответом?
////                           $.ajax({
////                               url: '/history',
////                               type: 'POST',
////                               data: formData,
////                               personID: Confirm['id'],
////                               projectID: Confirm['lastProject'],
////                               leaving: 'true',
//////                       async: false,
//////                       cache: false,
////                               contentType: false,
////                               processData: false
////
////                           });
//                       }
//                   });
//               }
            })


            }
    };
        return Confirm;
});