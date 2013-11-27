$('.list-item').each(function(idx,elt){
    var el = $('.bubble-icon')[idx];
    $(this).hover(function (ev) {


        $(this).stop(true).animate({paddingLeft: '15px'}, {speed: 50});
        $(el).stop(true).animate({opacity:'1', marginTop:'3px'}, {speed: 50});
    }, function () {
        $(this).stop(true).animate({paddingLeft: '0'}, {speed: 50});
        $(el).stop(true).animate({opacity:'0', marginTop:'-15px'}, {speed: 50});
    })

    $(this).click(function(){
        $(this).stop(true).animate({backgroundColor: '#adadad'}, {speed: 50});
    })
})