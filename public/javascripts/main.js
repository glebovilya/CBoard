require.config({
    baseUrl: "/javascripts/requier"
});


requirejs([/*'./myEmployee/emp'*/ 'vlad', 'Bogush',/* 'ilya'*/, 'stepa'], function(/*Emp*/ v){
//    var emp = new Emp(1);

    v();

});



