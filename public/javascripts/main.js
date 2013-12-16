require.config({
    baseUrl: "/javascripts/requier"
});



<<<<<<< HEAD
requirejs(['SearchForAccordion','ShowHideAllOnBoard', 'SearchInnerBoard', 'SearchForInnerBoard', 'connectionAccordion', 'connectionProject', 'connectionPerson' ], function( v, showHide, searchIB){
=======

requirejs(['SearchForAccordion','ShowHideAllOnBoard', 'SearchForInnerBoard', 'initAccordionOnPage', 'Classes/Person','Classes/Project','../thirdParty/bootstrap-datepicker','modaladdEmployee','modaladdProject' ], function( v, showHide, searchIB){
>>>>>>> c22c399ed8df63e1f8854878753ef7c53d90ba16


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



