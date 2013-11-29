define(['effectsAccordion'], function (setEffects) {

    function AccordionItem(/*obj - {id:'id', name:'name'}*/ obj, /*string, determines ID of new element body*/item) {
        /* EX: new AccordionItem({id:'256',name:'name'}, 'manager'); */

        this.templateList = '\
            <li class="list-item" data-point-id="itemID">\
                <a class="fadeThis" href="#"><i class="icon-chevron-right"></i> ItemName\
                    <i class="bubble-icon icon-forward"></i>\
                </a>\
            </li>';
        this.item = $('#' + item + '-body').find('ul.list')
        this.__construct(obj, this.item);
    }

    AccordionItem.prototype.__construct = function (obj, item) {
        var newItemlList = this.templateList.replace(/ItemName/, obj.name).replace(/itemID/, obj.id);
        var newItem = item.prepend(newItemlList);
        var itemString = item.selector + ' li.list-item[data-point-id=' + obj.id + ']';
        setEffects(itemString);
    }
    return AccordionItem;
});






