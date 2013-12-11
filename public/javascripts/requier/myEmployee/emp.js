define(['text!../templates/employe.html', '../../thirdParty/jquery.event.drag-2.2'], function(tmpl){

    var parseTMPL = function(emp) {
        emp.domNode.find('*').each(function(i, node) {
            var point = $(node).data('point');
            if(point == 'photo') {
                $(node).attr('src', emp[point])
            }
            else {
                $(node).html(emp[point])
            }
        })
    };

    var Emp = function(id) {
        var self = this;
        $.ajax({
            method: 'GET',
            url: '/user',
            async: false,
            data: {id: id},
            success:function(data){

                self.domNode = $(tmpl);
                self.id = data._id;
                self.name = data.name;
                self.surname = data.surname;
                self.position = data.position;
                self.status = data.status;
                self.photo = data.photo;

                parseTMPL(self);

//                self.render();
//                self.init()
            }
        })
        return self;
    };

    Emp.prototype.render = function(node){
        $(node).append(this.domNode);
    };

//todo: think about init logic

    Emp.prototype.init = function(){
        console.log('init', 'my id is -->' + this.id)
    };
    Emp.prototype.disable = function(){
        console.log('disable')
    };
    return Emp
})