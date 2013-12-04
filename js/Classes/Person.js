/**
 * Created by stepanjuk on 28.11.13.
 */


define ([], function(){



    function Employee(data){
        this.domNode = data['domNode'];
        this.name = data['name'];
        this.surname = data['surname'];
        this.id =data['id'];
        this.template = data['template'];
        this.photo = data['photo'];
        this.position = data['position'];


        this.destroy = function (event){
            console.log($(this.domNode));
            this.domNode.remove();
        };


        Employee.prototype.destroy = function(){
            this.domNode.remove();
        }


        Employee.init = function(){

        }
    }


    return Employee;

});