define(['text!../requier/templates/accordionHead.html', 'text!../requier/templates/accordionItem.html', 'text!../requier/templates/wrapItems.html', 'effectsAccordion'], function (accordHead, accordItem, accordWrapItem, setEffects) {

    function Accordion(/*object with data for accordion*/object, /*DOMNode to insert accordion with #*/divId) {
        this.templateHead = accordHead;
        this.templWrapperItems = accordWrapItem;
        this.templateList = accordItem;
        this.item;
        this.__construct(object, divId);
    }

    Accordion.prototype.__construct = function (object, divId) {
        var i = 0;
        var el;
        for (var elem in object) {
            i == 0 ? el = elem : el == elem ? i = 0 : el = elem;
            this.addHead(elem, object, divId, i);
            i++
        }
    }

    Accordion.prototype.addHead = function (/*string name of accordion heads*/elem, /*object with accordion data*/obj, /*DOMNode to insert accordion with #*/divIdSelector, /*integer counter to determine first elem to be opened*/i) {

        var newTemplateHead = this.templateHead.replace(/someHref/g, elem).replace(/headTitle/g, elem).
            replace(/idAccordGroup/g, elem).replace(/dataParentId/g, divIdSelector);

        $(divIdSelector).append(newTemplateHead);
        var newTemplWrapList = this.templWrapperItems.replace(/someID/g, elem);
        $('#' + elem + '-group').after(newTemplWrapList);

        for (var elems in obj[elem]) {
            this.addItem(obj[elem][elems], elem);
        }
    }

    Accordion.prototype.addItem = function (obj, item) {
        this.item = $('#' + item + '-body').find('ul.list');
        var newItemlList = this.templateList.replace(/ItemName/g, obj.name).replace(/itemID/g, obj.id);
        var newItem = this.item.prepend(newItemlList);
        var itemString = this.item.selector + ' li.list-item[data-point-id=' + obj.id + ']';
        setEffects(itemString);

    }

    return Accordion;
})
;






