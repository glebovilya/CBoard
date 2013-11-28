define(['generateAccordionItems'], function (AccordionItem) {

//    var peopleName = {manager: [
//        {id: '0', name: 'People0'},
//        {id: '1', name: 'People1'},
//        {id: '2', name: 'People2'}
//    ],
//        employee: [
//            {id: '0', name: 'Emp0'},
//            {id: '1', name: 'Emp1'},
//            {id: '2', name: 'Emp2'},
//            {id: '3', name: 'Emp3'}
//        ],
//        lead: [
//            {id: '0', name: 'Lead0'},
//            {id: '1', name: 'Lead1'},
//            {id: '2', name: 'Lead2'},
//            {id: '3', name: 'Lead3'},
//            {id: '4', name: 'Lead4'}
//        ]};
//
//    var projects = {open: [
//        {id: '0', name: 'Project0'},
//        {id: '1', name: 'Project1'},
//        {id: '2', name: 'Project2'},
//        {id: '3', name: 'Project3'},
//        {id: '4', name: 'Project4'},
//        {id: '5', name: 'Project5'}
//    ],
//        closed: [
//            {id: '0', name: 'ClosedProject0'},
//            {id: '1', name: 'ClosedProject1'},
//            {id: '2', name: 'ClosedProject2'}
//        ]};
    var i = 0;

    function AccordionHead(elem, obj, divIdSelector) {
        this.elem = elem;
        this.obj = obj;
        this.divIdSelector = divIdSelector;

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

        this.__construct(this.elem, this.obj, this.divIdSelector);
    }

    AccordionHead.prototype.__construct = function (elem, obj, divIdSelector) {

        var newTemplateHead = this.templateHead.replace(/someHref/, elem).replace(/headTitle/, elem).
            replace(/idAccordGroup/, elem);
        $(divIdSelector).append(newTemplateHead);

        var newTemplWrapList = this.templWrapperItems.replace(/someID/, elem);
        if (i == 0) {
            newTemplWrapList = newTemplWrapList.replace(/collapse/, 'collapse in');
        }
        i++;
        $('#' + elem + '-group' + ' div.accordion-heading').after(newTemplWrapList);
        var item = $('#' + elem + '-body' + ' ul');
//        console.log(item);
        console.log(obj[0][elem]);

        for (var elems in obj[0][elem]) {
            console.log(elems);
            new AccordionItem(elem, obj[item],item);

        }
    }


    return AccordionHead;
});






