/**
 * Created by stepanjuk on 02.12.13.
 */
define(['Classes/Person'], function(Person){

        function showPerson(dataId){

                    Person.init(dataId);
        }
    return showPerson
});

//
//$(empl.domNode).attr("dataId", id);
//jQuery(function($){
//
//    $(empl.domNode).drag(function( ev, dd ){
//
//
////                            console.log($(this).attr("dataId"));
//        $( this ).css({
//            top: dd.offsetY,
//            left: dd.offsetX
//        });
//
//
//    });
//});

//$(empl.domNode).drag('init',function (ev, dd) {
//    $(dd.drag).parents('div:eq(0)').css('position', 'absolute');
////                   $.post('/user/:id', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){
//
////
//    $.post('/user/'+$(this).attr("dataId"), {}, function(ell){
//        console.log('setCur--->'+ ell+"id="+$(this).attr("dataId") )
//    });
//
//});
//
//$(empl.domNode).drag('end', function (ev, dd) {
//    $.post('/get', {target: 'person', id: 1}, function(ell){
//
//    });
//
//    if (dd.drop) {
//
//        $(dd.drag).removeAttr('style');
//        $(dd.drop).append($(dd.drag).parents('div:eq(0)').css('position', 'relative'));
////
//    }
//});