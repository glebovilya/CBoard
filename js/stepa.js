/**
 * Created by Jura on 01.12.13.
 */


define(function () {


$.get('/get', {target: 'person', method: 'all'}, function (dataPerson) {
    var people = {};
    for(var i=0; i<dataPerson.length; i++){
        console.log(dataPerson[i]);
    }

//    for (var elems in dataPerson) {
//
//        console.log ( 'person = '+elems);
////        var itemk = dataPerson[elems].position
////        if (itemk in people)
////            people[itemk][people[itemk].length] = {id: dataPerson[elems]._id, name: dataPerson[elems].name};
////        else
////            people[itemk] = [
////                {id: dataPerson[elems]._id, name: dataPerson[elems].name}
////            ];
//    }
});



});