require.config({
    baseUrl: "/javascripts/requier"
});



requirejs([/*'./myEmployee/emp'*/ 'vlad', 'ShowHide', 'Bogush', 'ilya', 'stepa'], function(/*Emp*/ v, showHide){

//    var emp = new Emp(1);

    v();
    showHide.init();



//    $.ajax({
//        url: '/history',
//        type: 'POST',
//        data: {personID: 2, projectID: 2, statusID: 3, leaving: false},
//        success: function(res) {
//            console.log(res)
//        }
//    })
});



