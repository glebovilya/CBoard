define(['text!../requier/templates/accordionHead.html', 'text!../requier/templates/accordionItem.html', 'text!../requier/templates/wrapItems.html', 'effectsAccordion', 'scroll'], function (accordHead, accordItem, accordWrapItem, setEffects) {

    function Accordion(/*object with data for accordion*/object, /*DOMNode to insert accordion with #*/divId) {
//        console.log(accordHead)
        this.templateHead = accordHead;
        this.templWrapperItems = accordWrapItem;
        this.templateList = accordItem;
        this.item;
        this.__construct(object, divId);
//        this.setScroll('.container-scroll', '.scroller', '.scroller__bar');
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
//        console.log(newTemplateHead);
        $(divIdSelector).append(newTemplateHead);
        var newTemplWrapList = this.templWrapperItems.replace(/someID/g, elem);
//        if (i == 0) {
//            newTemplWrapList = newTemplWrapList.replace(/collapse/, 'collapse in');
//        }
//        i++;
        var handlerClick = $('#' + elem + '-group').after(newTemplWrapList);
//        handlerClick.click(function () {
//            if (this.nextSibling.className.match(/.*accordion-body.*collapse in/) || this.nextSibling.className.match(/.*accordion-body.*in collapse/)) {
//                return false;
//            }
//        })

        for (var elems in obj[elem]) {
            this.addItem(obj[elem][elems], elem);
//            console.log(elem)
        }
    }

    Accordion.prototype.addItem = function (obj, item) {
        this.item = $('#' + item + '-body').find('ul.list');
        var newItemlList = this.templateList.replace(/ItemName/g, obj.name).replace(/itemID/g, obj.id);
        var newItem = this.item.prepend(newItemlList);

        var itemString = this.item.selector + ' li.list-item[data-point-id=' + obj.id + ']';
        setEffects(itemString);

    }

//    Accordion.prototype.setScroll = function(container, scroller, scroll){
//        baron({
//            root: container,
//            scroller: scroller,
//            bar: scroll,
//            barOnCls: 'baron'
//        }).fix({
//                elements: '.header__title',
//                outside: 'header__title_state_fixed',
//                before: 'header__title_position_top',
//                after: 'header__title_position_bottom',
//                clickable: true
//
//            });
//    }



    return Accordion;
})
;






