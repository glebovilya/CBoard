define(['jquery.event.drag-2.2', 'jquery.event.drop-2.2'/*, 'jquery.event.drag.live-2.2'*/],
    function () {
        function init () {
            $('#imp')
                .drag('init', function (ev, dd) {
                    $(dd.drag).parents('div:eq(0)').css('position', 'absolute')
//                    $.post('/get', {"target": "person", "method": "add", "name": "superTEST", "surname": "TESTSurname", "position": "gg", "photo": "dd"}, function(ell){
//                        console.log('setCur--->', ell)
//                    })
                    console.log('set current person to true')
                    console.log(ev)
                })
                .drag('end', function (ev, dd) {
                    $.post('/get', {target: 'person', id: 1}, function(ell){
                        console.log('dismiss--->',ell)
                    })
                    console.log('set current person to false')
                    if (dd.drop) {
        //                    $.ajax('/get')
                        $(dd.drag).removeAttr('style')
                        $(dd.drop).append($(dd.drag).parents('div:eq(0)').css('position', 'relative'));
                        console.log('create history')
//                        $.get('/get', {target: 'person', method: 'one', id: 1}, function(ell){
////                            console.log(ell)
//                        })
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




            $('#addperson').submit(function(event){

                //disable the default form submission
//                event.preventDefault();

                //grab all form data
                var formData = new FormData($(this)[0]);

                $.ajax({
                    url: '/upload_person',
                    type: 'POST',
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (returndata) {
                        alert(returndata);
                    }
                });

                return false;
            });
            $('#addproject').submit(function( captureSubmit ) {
            });
//            $('body').on('click', function() {$.ajax({url: '/img/45.jpg', dataType: 'image'}, function() {console.log('2')})})
        }
        return init
    }

)
