
define(['../StorageForObjectsOnBoard','text!../templates/accordionHead.html', 'text!../templates/accordionItem.html', 'text!../templates/wrapItems.html', '../effectsAccordion', 'Classes/Person', 'Classes/Project'], function (storage, accordHead, accordItem, accordWrapItem, setEffects, Person, Project) {

    /**
     * Accordion constructor
     * @param object
     * @param divId
     * @constructor
     */
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
    };


    /**
     * Depending on for what group of person or projects this constructor was called
     * the headers wil be different
     *
     * @param elem
     * @param obj
     * @param divIdSelector
     * @param i
     */
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


    /**
     * adds item to accordion list
     * @param obj
     * @param item
     */
    Accordion.prototype.addItem = function (/*Person or Project object*/obj, /*String*/item) {
        this.item = $('#' + item + '-body').find('ul.list');
        var newItemlList = this.templateList.replace(/ItemName/g, obj.name).replace(/itemID/g, obj.id);
        var ItemAsJqueryObj = $(newItemlList);

        //creates icon if person is in SkillUp roject more then 2 weeks
        if(obj['inSkillUpFrom']) {
            var dateNow = new Date();
            var inSkillUpFrom = new Date(obj['inSkillUpFrom']);
            var msToDays = 1000*60*60*24;

            var deferenceInDays = (dateNow - inSkillUpFrom)/msToDays

            if(deferenceInDays >= 14) {
                ItemAsJqueryObj.find('a').prepend('<i class=" icon-fire" style="float: right"></i>')
            }
        }



        this.item.prepend(ItemAsJqueryObj);
        var itemString = this.item.selector + ' li.list-item[data-point-id=' + obj.id + ']';
        setEffects(itemString);
        var strg = storage.storage;
        var onBoard;
        if (item == "Open" || item == "Closed" || item == "SkillUp") {
            $(itemString).bind("click", function(){
                onBoard = false;
                /**
                 * here goes logic for adding obj to the storage
                 * to make possible calling its methods/search/remove
                 */
                for (var i in strg){
                    if (strg[i]['id'] == obj.id  && strg[i].constructor == Project ){
                        onBoard = true
                    }
                }

                if(!onBoard){
                    new Project(obj.id);

                }
            })
        }
        else
            $(itemString).bind("click", function () {
                onBoard = false
                /**
                 * here goes logic for adding obj to the storage
                 * to make possible calling its methods/search/remove
                 */
                for (var i in strg){
                    if (strg[i]['id'] == obj.id && !strg[i]['inProject'] && strg[i].constructor != Project){
                        onBoard = true
                    }
                }

                if(!onBoard){
                    new Person({id: obj.id});
                }

            })
    }

    return Accordion;
})
;






