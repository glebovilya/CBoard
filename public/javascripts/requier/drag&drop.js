/**
 * Created by Jura on 08.12.13.
 */
define(['Confirm'], function(Confirm){

    function transit(data,Person){
//        $(data.domNode).remove();
        Confirm.init(data,Person);
    }

 return transit;

});
