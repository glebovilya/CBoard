
requirejs(['effectsAccordion', 'popoverForEmployee', 'jquery.event.drag-2.2', 'jquery.event.drag-2.2.live'],
    function   () {
        $('#imp').drag(function( ev, dd ){
            $( this ).css({
                top: dd.offsetY,
                left: dd.offsetX
            });
        });
    }
);