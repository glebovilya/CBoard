define(function () {

   function AccordionItem(elem, obj) {
       this.templateList = '\
    <li class="list-item" data-point-id="itemID">\
        <a class="fadeThis" href="#"><i class="icon-chevron-right"></i> peopleName\
            <i class="bubble-icon icon-forward"></i>\
        </a>\
    </li>';

        this.__construct(elem, obj);
    }

    AccordionItem.prototype.__construct = function (elem, obj) {

            var newItemlList = templItem.replace(/peopleName/, obj[elem][elems].name).replace(/itemID/, obj[elem][elems].id);
            obj.prepend(newItemlList);

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






