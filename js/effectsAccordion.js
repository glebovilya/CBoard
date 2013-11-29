define(function () {
    function setEffects(item) {
        $(item).hover(function (ev) {
                $(this).stop(true).animate({paddingLeft: '15px'}, {duration: 400});
                $(this).find('i.bubble-icon').stop(true).animate({opacity: '1', marginTop: '3px'}, {duration: 300});
            },
            function (ev) {
                $(this).stop(true).animate({paddingLeft: '0'}, {duration: 400});
                $(this).find('i.bubble-icon').stop(true).animate({opacity: '0', marginTop: '-15px'}, {duration: 300});
            });
    }

    return setEffects;
});