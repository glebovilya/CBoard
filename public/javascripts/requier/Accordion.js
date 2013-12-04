define(['AccordionHead'], function (AccordionHead) {

    function Accordion(/*object with data for accordion*/object, /*DOMNode to insert accordion with #*/divId) {
        this.__construct(object, divId);
    }

    Accordion.prototype.__construct = function (object, divId) {
        var i = 0;
        var el;
        for (var elem in object) {
            i == 0 ? el = elem : el == elem ? i = 0 : el = elem;
            var h = new AccordionHead(elem, object, divId, i);
            i++
        }
    }
    return Accordion;
});






