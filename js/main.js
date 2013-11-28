
requirejs(['effectsAccordion', 'jquery.event.drag-2.2', 'jquery.event.drop-2.2', 'newEmployee'/*, 'jquery.event.drag.live-2.2'*/],
    function (empl) {
        $('#imp')
            .drag('init', function (ev, dd) {
                $(dd.drag).parents('div:eq(0)').css('position', 'absolute')
                console.log('set current person to true')
                console.log(ev)
            })
            .drag('end', function (ev, dd) {
                console.log('set current person to false')
                if (dd.drop) {
//                    $.ajax('/get')
                    $(dd.drag).removeAttr('style')
                    $(dd.drop).append($(dd.drag).parents('div:eq(0)').css('position', 'relative'))
                    console.log('create history')


                    $.get('/get', {data: 'sdfasdf', name: 'test'}, function(ell){
                        console.log(ell)
                    })
                }
            })
            .drag(function( ev, dd ){
                $( this ).css({
                    top: dd.offsetY,
                    left: dd.offsetX
                });
            });
        $('#drop')
            .drop('start',function(){
                console.log('set current project to true');
            })
            .drop('end', function(){
                console.log('set current project to false');

            })
    })

