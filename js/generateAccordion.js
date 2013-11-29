define(['generateAccordionHeads'], function (AccordionHead) {

//    function Accordion( peopleName, projects) {
    function Accordion( object, divId) {
//        this.obj =
//        this.objects = [[projects, "#accordion-projects"],[peopleName, "#accordion-people"]];

        this.__construct(object, divId);

    }

    Accordion.prototype.__construct = function (object, divId) {

            for (var elem in object) {

                var h = new AccordionHead(elem, object, divId);
            }

    }

    return Accordion;
});






