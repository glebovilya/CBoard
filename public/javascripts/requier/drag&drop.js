/**
 * Created by Jura on 08.12.13.
 */
define(['Confirm'], function(Confirm){
//    var item = Person.init({id:0,parentNode:"#firstDraft"});
    function transit(data,Person){
        $(data.domNode).remove();
        Confirm.init(data,Person);
    }
    return transit;
});
