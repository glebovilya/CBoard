require.config({
    baseUrl: "/javascripts/requier"
});


requirejs(['./myEmployee/emp', 'Bogush', 'ilya', 'stepa'], function(Emp){
    var emp = new Emp(1);
//    emp.render();
//    console.log(emp)
});

