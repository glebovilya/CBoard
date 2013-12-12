require.config({
    baseUrl: "/javascripts/requier"
});



requirejs(['./myEmployee/emp', 'vlad', 'ShowHide', 'SearchInnerBoard', 'Bogush', 'ilya', 'stepa', ], function(Emp, v, showHide, searchIB){

//    var inherited = function(parent, child) {
//        var F = function(){};
//        F.prototype = parent.prototype;
//        child.prototype = new F();
//        child.prototype.constructor = child['__constructor'];
//        child.superclass = parent.prototype;
//
//        return child
//    }
//
//    $.inherited = inherited;

    searchIB();
    v();
    showHide.init();
    $('button').bind('testevent',function(e){
        console.log(e.target);
    });
    $('button').on('click',function(){
        $('button').trigger('testevent');
    })
//new Emp('1', $('#inner-board'))
//    var emp = new Emp('1', $('body'));

//    $.ajax({
//        url: '/history',
//        type: 'POST',
//        data: {personID: 2, projectID: 2, statusID: 3, leaving: false},
//        success: function(res) {
//            console.log(res)
//        }
//    })
});



