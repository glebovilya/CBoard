require.config({
    baseUrl: "/javascripts/requier"
});



requirejs([/*'./myEmployee/emp'*/ 'vlad', 'ShowHide', 'Bogush', 'ilya', 'stepa'], function(/*Emp*/ v, showHide){

//    var emp = new Emp(1);

    v();
    showHide.init();

});



