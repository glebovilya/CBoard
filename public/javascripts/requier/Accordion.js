define(['text!../requier/templates/accordionHead.html', 'text!../requier/templates/accordionItem.html', 'text!../requier/templates/wrapItems.html', 'effectsAccordion', 'Classes/Person_new', 'Classes/Project'], function (accordHead, accordItem, accordWrapItem, setEffects, Person, Project) {

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
            replace(/idAccordGroup/g, elem).replace(/IdDataParent/g, divIdSelector);

        $(divIdSelector).append(newTemplateHead);
        var newTemplWrapList = this.templWrapperItems.replace(/someID|IdDataParent/g, elem);

        /* collapse in the first element */
        if (i == 0) {
            newTemplWrapList = newTemplWrapList.replace(/collapse/g, 'collapse in')
        }
        var handlerClick = $('#' + elem + '-group div.accordion-heading').after(newTemplWrapList);

        /* always open one accordion body (don't close current body) */
        handlerClick.click(function () {
            if (this.nextSibling.className == "accordion-body collapse in" || this.nextSibling.className == "accordion-body in collapse") {
                return false;
            }
        })

        for (var elems in obj[elem]) {
            this.addItem(obj[elem][elems], elem);
        }
    }

    Accordion.prototype.addItem = function (obj, item) {
        this.item = $('#' + item + '-body').find('ul.list');
        var newItemlList = this.templateList.replace(/ItemName/g, obj.name).replace(/itemID/g, obj.id);
        this.item.prepend(newItemlList);
        var itemString = this.item.selector + ' li.list-item[data-point-id=' + obj.id + ']';
        setEffects(itemString);
        if (item == "Open" || item == "Closed") {
            $(itemString).bind("click", function(){
                new Project(obj.id)})
        }
        else
            $(itemString).bind("click", function () {
                new Person({id: obj.id});
            })
    }

    return Accordion;
})
;






