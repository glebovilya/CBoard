define (function(){

    /*
    *  declaring Widget - base class for project and people views
    * */

    function Widget(DOMNode, opts){
        this.DOMNode = DOMNode;
        this.opts = opts;
        this.init();
    };

    Widget.prototype.self = function(){return this};
    Widget.prototype.init = function(){};
    Widget.prototype.render = function(){};
    Widget.prototype.template = '';
    Widget.prototype.DOMNode = null;
    Widget.prototype.destroy = function(){self.remove()};

    return Widget;
    });
