/**
 * Created by Jura on 08.12.13.
 */
define(['Confirm','./Classes/Person_new'], function(Confirm,Person){

    function  dragDrop(){
    $('#inner-board').ready(function(){
        jQuery(function(S){
            $('.drag')
                .drag("init", function(ev, dd){
//                                 console.log(parseInt($(this.parentNode).css("margin-left")));
//                                 console.log($(this.parentNode).offset().left);
                    dd.ids = '1'

                })
                .drag(function( ev, dd ){

                    $( this ).css({
                        top: dd.offsetY-$(this.parentNode).offset().top,
                        left: dd.offsetX-$(this.parentNode).offset().left
                    });
                });
            $('.drop')
                .drop(function (ev,dd){
                    //drag ??????? ??????
//                                $( this ).toggleClass('dropped');
//                                  console.log(dd.target.id);//??????
//                                  console.log($(dd.drag).attr("data-id"));//????????
//                                  console.log(dd.drag.parentNode.id);//?????

                    console.log('ids' +dd.ids);
                    console.log($(dd.drag).attr('id'));

                    transit({
                        domNode:$(dd.drag).attr('id'),
                        id: $(dd.drag).attr("data-id"),
                        lastProject: dd.drag.parentNode.id,
                        currentProject: dd.target.id
                    },Person);
                })
        });
    });





//        console.log($(data.domNode))

        $(data.domNode).remove();
        Confirm.init(data,Person);
    }
        return transit


});
