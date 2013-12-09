/**
 * Created by stepanjuk on 02.12.13.
 */

define(['Classes/Person','text!./templates/addRemoveDate.html'], function(Person,templ){
console.log(Person);
var template = templ;
//

//
//    function initConfirm(data/*{id:1,action:(add,transfer,remove)}*/){
//    var id = data['id'];
//        if(data['action'] == 'transfer'){
//            $(template).appendTo($("#inner-board"));
//
//            $("#formConfirmDate").ready(function(){
//
//                 $(".datepicker").datepicker();
//                 Person.init({id:1,forPhoto:'true',parentNode:"#windowForPhoto"})
////                $(templateEmployee).appendTo($(".windowForPhoto"));
//
//
//            });
//            $("#myModal").ready(function(){
//                $(".modal-header>button").on('click', function(event){
//                    $("#myModal").remove();
//                });
//            });
//         }
//    }
    var Confirm  = {
        template: templ,
        init: function(data){
            console.log(data)
            Confirm.id = data['id'];
            if(data['lastProject']){
                Confirm.lastProject = data['lastProject'];
            }else{
                Confirm.lastProject = "freeShooter";
            }
            if(data['currentProject']){
                Confirm.currentProject = data['currentProject'];
            }else{
                Confirm.currentProject = "freeShooter";
            }


            Confirm.render();
        },
        render: function(){
            $(Confirm.template).appendTo($("#inner-board"));
            $("#formConfirmDate").ready(function(){
                $(".datepicker").datepicker();
                $("#lastProject").val(Confirm['lastProject']);
                $("#currentProject").val(Confirm.currentProject);
                Person.init({
                    id: Confirm.id,
                    forPhoto: 'true',
                    parentNode: "#windowForPhoto"
                });




            });


        }
    }
//
//        return Confirm;
    return Confirm.init({id:1,action:'transfer',forPhoto:'true',lastProject: 'last',currentProject:'current'});
});