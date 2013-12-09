require.config({
    baseUrl: "/javascripts/requier"
});


requirejs([/*'./myEmployee/emp'*/ 'vlad', 'ShowHide', 'Bogush', /*'ilya',*/ 'stepa'], function(/*Emp*/ v, showHide){
//    var emp = new Emp(1);

    v();
    showHide.init();

    /************************************
    * uncomment this to test history push
    *************************************/

//    $.ajax({
//        url: '/history',
//        type: 'POST',
//        data: {personID: 1, projectID: 1, statusID: 3, leaving: true},
//        success: function(res) {
//            console.log(res)
//        }
//    })
});



