define(['jquery.event.drag-2.2', 'jquery.event.drop-2.2'/*, 'jquery.event.drag.live-2.2'*/],
    function () {
        function init () {
            $('#imp')
                .drag('init', function (ev, dd) {
                    $(dd.drag).parents('div:eq(0)').css('position', 'absolute')
                    $.post('/get', {target: 'person', method: 'setCurrent', id: '1'}, function(ell){
                        console.log('setCur--->', ell)
                    })
                    console.log('set current person to true')
                    console.log(ev)
                })
                .drag('end', function (ev, dd) {
                    $.post('/get', {target: 'person', method: 'setCurrent', id: 1}, function(ell){
                        console.log('dismiss--->',ell)
                    })
                    console.log('set current person to false')
                    if (dd.drop) {
        //                    $.ajax('/get')
                        $(dd.drag).removeAttr('style')
                        $(dd.drop).append($(dd.drag).parents('div:eq(0)').css('position', 'relative'));
                        console.log('create history')
                        $.get('/get', {target: 'person', method: 'one', id: 1}, function(ell){
//                            console.log(ell)
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
        }
        return init
    }

)
