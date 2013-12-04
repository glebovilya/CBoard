/**
 * Created by stepanjuk on 28.11.13.
 */


define ([], function(){



    function Employee(idt){
        var idFix = Math.random().toString(36).slice(3,9);

        $.get("/user",{ id: idt}, onAjaxSuccess);


        function  onAjaxSuccess(data){
            id = "person_"+idFix;

                console.log(data)
            this.domNode = $("#" + id);
            this.photo = data.photo;
            this.name = data.name;
            this.surname = data.surname;
            this.position = data.position;
        }


    }
    return Employee;

});