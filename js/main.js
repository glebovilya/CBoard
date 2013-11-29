function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.prototype.superclass = Parent;
}

function mixin(destination, source) {
    for (var i in source) {
        destination[i] = source[i];
    }
}


requirejs(['classes/Widget','classes/Project'],

    function(Widget,Project){
        console.dir(Project);
        var project = new Project(document.body, {id:'1'})
    }
);
