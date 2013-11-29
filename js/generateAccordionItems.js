define(['effectsAccordion'], function (Effect) {

    function AccordionItem(obj, item) {
        this.templateList = '\
    <li class="list-item" data-point-id="itemID">\
        <a class="fadeThis" href="#"><i class="icon-chevron-right"></i> ItemName\
            <i class="bubble-icon icon-forward"></i>\
        </a>\
    </li>';
//       console.log(elem)
//console.log(obj)
//       console.log(item)
        this.__construct(obj, item);
    }

    AccordionItem.prototype.__construct = function (obj, item) {

        var newItemlList = this.templateList.replace(/ItemName/, obj.name).replace(/itemID/, obj.id);
        item.prepend(newItemlList);

//        console.log(this)


                $(newItemlList).each(function (idx, elt) {
                    console.log($(this))
            var el = $('.bubble-icon')[idx];
                    $(this).click(function(){alert('dfg')})
            $(this).hover(function (ev) {


                $(this).stop(true).animate({paddingLeft: '15px'}, {speed: 50});
//                $(el).stop(true).animate({opacity: '1', marginTop: '3px'}, {speed: 50});
            }, function () {
                $(this).stop(true).animate({paddingLeft: '0'}, {speed: 50});
//                $(el).stop(true).animate({opacity: '0', marginTop: '-15px'}, {speed: 50});
            })})

       


//                    console.log($(this))})

//
////        var e = new Effect(newItemlList);
//        console.log($(newItemlList) );
//        $(newItemlList).hover(function (ev) {
////
//
//            $(newItemlList).stop(true).animate({paddingLeft: '15px'}, {speed: 50});
////        $(el).stop(true).animate({opacity: '1', marginTop: '3px'}, {speed: 50});
//        }, function () {
//            $(newItemlList).stop(true).animate({paddingLeft: '0'}, {speed: 50});
////        $(el).stop(true).animate({opacity: '0', marginTop: '-15px'}, {speed: 50});
//        });

    }


//    Accordion.prototype.addItems = function (obj, templWrapperItems, templItem) {
//        var i = 0;
//        for (var elem in obj) {
//            var newTemplWrapList = templWrapperItems.replace(/someID/, elem);
//            if (i == 0) {
//                newTemplWrapList = newTemplWrapList.replace(/collapse/, 'collapse in');
//            }
//            i++;
//            var element = $('#' + elem + '-group' + ' div.accordion-heading');
//            element.after(newTemplWrapList);
//            var item = $('#' + elem + '-body' + ' ul');
//
//            for (var elems in obj[elem]) {
//                var newItemlList = templItem.replace(/peopleName/, obj[elem][elems].name).replace(/itemID/, obj[elem][elems].id);
//                item.prepend(newItemlList);
//            }
//        }
//    }
    return AccordionItem;
});






