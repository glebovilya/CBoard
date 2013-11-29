define(['AccordionItem'], function (AccordionItem) {

    function AccordionHead(/*string name of accordion heads*/elem, /*object with accordion data*/obj, /*DOMNode to insert accordion with #*/divIdSelector, /*integer counter to determine first elem to be opened*/i) {

        this.templateHead = '\
            <div class="accordion-group" id="idAccordGroup-group">\
                <div class="accordion-heading">\
                    <button type="button" class="btn accord btn-custom"\
                    data-toggle="collapse"\
                    data-parent="dataParentId" href="#someHref-body">\
                    headTitle\
                    </button>\
                </div>\
            </div>';

        this.templWrapperItems = '<div id="someID-body" data-point="ellement" class="accordion-body collapse"><ul class="list"><li class="list-item-last"></li></ul></div>';

        this.__construct(elem, obj, divIdSelector, i);
    }

    AccordionHead.prototype.__construct = function (elem, obj, divIdSelector, i) {

        var newTemplateHead = this.templateHead.replace(/someHref/, elem).replace(/headTitle/, elem).
            replace(/idAccordGroup/, elem).replace(/dataParentId/, divIdSelector);
        $(divIdSelector).append(newTemplateHead);
        var newTemplWrapList = this.templWrapperItems.replace(/someID/, elem);
        if (i == 0) {
            newTemplWrapList = newTemplWrapList.replace(/collapse/, 'collapse in');
        }
        i++;
        var handlerClick = $('#' + elem + '-group' + ' div.accordion-heading').after(newTemplWrapList);
        handlerClick.click(function(){

            if(this.nextSibling.className=="accordion-body collapse in" || this.nextSibling.className=="accordion-body in collapse" ){
                return false;
            }
        })
        for (var elems in obj[elem]) {
            new AccordionItem(obj[elem][elems], elem);
        }
    }

    return AccordionHead;
});






