define (['../require-jquery'],function($){
    /*
    *  declaring Widget - base class for project and people views
    * */
    var Widget;

    Widget = $.declare('js.Classes.Widget',null,{
        /*
        * lends widget onto page
        * */
        init: function(){},
        render:function(){},
        template: '',
//        url of template, it takes from '/templates' folder
        domNode: null,

     });
    return Widget;
})