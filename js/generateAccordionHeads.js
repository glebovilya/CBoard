var peopleName = {manager: ['People1', 'People2', 'People3'], employee: ['Emp1', 'Emp2', 'Emp3', 'Emp4'], lead: ['Lead1', 'Lead2', 'Lead3', 'Lead4', 'Lead5']};
var projects = {open: [{id: 'id', name: 'name'}, 'Project2', 'Project3', 'Project4', 'Project5', 'Project6'], closed: ['ClosedProject1', 'ClosedProject2', 'ClosedProject3']}

var templateHead = '\
<div class="accordion-group" id="idAccordGroup-group">\
    <div class="accordion-heading">\
        <button type="button" class="btn accord btn-custom accordion-toggle"\
        data-toggle="collapse"\
        data-parent="#accordion-people" href="#someHref-body">\
        headTitle\
        </button>\
    </div>\
</div>';

var templateWrapListbefore = '<div id="someID-body" data-point="ellement" class="accordion-body collapse"><ul class="list"><li class="list-item-last"></li></ul></div>';
var templateList = '\
    <li class="list-item">\
        <a class="fadeThis" href="#"><i class="icon-chevron-right"></i> peopleName\
            <i class="bubble-icon icon-forward"></i>\
        </a>\
    </li>';


/*
 *  adding accordion heads
 */
function addHeads(obj, templHead, divIdSelector) {
    for (var people in obj) {
        var newTemplateHead = templHead.replace(/someHref/, people).replace(/headTitle/, people).
            replace(/idAccordGroup/, people);
        $(divIdSelector).append(newTemplateHead);
    }
}

/*
 *  adding inner accordion list items
 */
function addItems(obj, templWrapperItems, templItem) {
    var i = 0;
    for (var elem in obj) {
        var newTemplWrapListBefore = templWrapperItems.replace(/someID/, elem);
        if (i == 0) {
            newTemplWrapListBefore = newTemplWrapListBefore.replace(/collapse/, 'collapse in');
        }
        i++;
        var element = $('#' + elem + '-group' + ' div.accordion-heading');
        element.after(newTemplWrapListBefore);
        var item = $('#' + elem + '-body' + ' ul');

        for (var elems in obj[elem]) {
            var newItemlList = templItem.replace(/peopleName/, obj[elem][elems]);
            item.prepend(newItemlList);
        }
    }
}

addHeads(projects, templateHead, "#accordion-projects");
addItems(projects, templateWrapListbefore, templateList);
addHeads(peopleName, templateHead, "#accordion-people");
addItems(peopleName, templateWrapListbefore, templateList);



