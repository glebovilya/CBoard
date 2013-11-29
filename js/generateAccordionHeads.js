define(['generateAccordionItems'], function (AccordionItem) {
    var i = 0;

    function AccordionHead(elem, obj, divIdSelector) {
//        this.elem = elem;
//        this.obj = obj;
//        this.divIdSelector = divIdSelector;

        this.templateHead = '\
<div class="accordion-group" id="idAccordGroup-group">\
    <div class="accordion-heading">\
        <button type="button" class="btn accord btn-custom accordion-toggle"\
        data-toggle="collapse"\
        data-parent="#accordion-people" href="#someHref-body">\
        headTitle\
        </button>\
    </div>\
</div>';

        this.templWrapperItems = '<div id="someID-body" data-point="ellement" class="accordion-body collapse"><ul class="list"><li class="list-item-last"></li></ul></div>';

        this.__construct(elem, obj, divIdSelector);
    }

    AccordionHead.prototype.__construct = function (elem, obj, divIdSelector) {

        var newTemplateHead = this.templateHead.replace(/someHref/, elem).replace(/headTitle/, elem).
            replace(/idAccordGroup/, elem);
        $(divIdSelector).append(newTemplateHead);

        var newTemplWrapList = this.templWrapperItems.replace(/someID/, elem);
//        console.log(i,elem)
        if (i == 0) {


            newTemplWrapList = newTemplWrapList.replace(/collapse/, 'collapse in');

        }
        i++;
        $('#' + elem + '-group' + ' div.accordion-heading').after(newTemplWrapList);
        var item = $('#' + elem + '-body' + ' ul');

        for (var elems in obj[elem]) {
            new AccordionItem(obj[elem][elems],item);
        }
    }


    return AccordionHead;
});






