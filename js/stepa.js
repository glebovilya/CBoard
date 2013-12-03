/**
 * Created by Jura on 01.12.13.
 */

define(['newEmployee', 'addEmployee'/*'confirmDate', 'bootstrap-datepicker'/*,'addProject'*/],function () {








//  тест получить данные из базы
$.get('/get', {target: 'person', method: 'all'}, function (dataPerson) {
    var people = {};
    for(var i=0; i<dataPerson.length; i++){
        console.log(dataPerson[i]);
    }
});

});