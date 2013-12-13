define(['text!../templates/employe.html', '../../thirdParty/jquery.event.drag-2.2'], function(tmpl){

    var inherited = function(parent, child) {
        var F = function(){};

        child = child();
        var constructor = function(){
            if(child.__construct) {
                child.__construct.apply(child, arguments);
            }
        }
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = constructor;
        child.superclass = parent.prototype;

        return constructor
    };

    return inherited({},function(){
        var Emp = {
            __v: '',
            domNode: $(tmpl),
            _id: '',
            name: '',
            surname: '',
            position: '',
            status: '',
            photo: '',
            __construct: function(data, node) {
                if(typeof(data) == 'object') {
                    this.assignValues(data)
                }
                else {
                    var self = this;
                    var param
                    $.ajax({
                        method: 'GET',
                        url: '/user',
                        async: false,
                        data: {id: data},
                        success: function(res) {
                            param = res
                        }
                    })
                    this.assignValues(param)
//                    console.log('this-->',this)
                }
                this.parseTemplate();
                this.render(node)
            },
            assignValues: function(data) {
                for (var i in data) {
                    this[i] = data[i]
                }
            },
            render: function(node){
                $(node).append(this.domNode);
            },
            parseTemplate: function() {
                this.domNode.find('*').each(function(i, node) {
                    var point = $(node).data('point');
                    if(point == 'photo') {
                        $(node).attr('src', this[point])
                    }
                    else {
                        $(node).html(this[point])
                    }
                })
            }
        };

        return Emp
    })
});