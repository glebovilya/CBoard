/**
 * Created by stepanjuk on 02.12.13.
 */

require(['text!./templates/addRemoveDate.html', '../thirdParty/bootstrap-datepicker','Classes/Person'], function(templ,darepicker,Person){

var template = templ;

//    Person.init({id:1,parentNode:$("#mama")});

    function initConfirm(data/*{id:1,action:(add,transfer,remove)}*/){
    var id = data['id'];
        if(data['action'] == 'transfer'){
            $(template).appendTo($("#inner-board"));

            $("#formConfirmDate").ready(function(){

                 $(".datepicker").datepicker();
                 Person.init({id:id,forPhoto:'true'})
//                $(templateEmployee).appendTo($(".windowForPhoto"));


            });
            $("#myModal").ready(function(){
                $(".modal-header>button").on('click', function(event){
                    $("#myModal").remove();
                });
            });
         }

    }
//    return initConfirm({id:1,action:'transfer'});
});