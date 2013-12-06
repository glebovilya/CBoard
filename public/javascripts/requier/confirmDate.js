/**
 * Created by stepanjuk on 02.12.13.
 */

require(['text!./templates/addRemoveDate.html', '../thirdParty/bootstrap-datepicker','Classes/Person'], function(templ,darepicker,Person){

var template = templ;


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

            });
         }

    }
//    return initConfirm({id:1,action:'transfer'});
});