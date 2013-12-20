/*
 * Created by stepanjuk on 02.12.13.
 */

define(['text!./templates/addProject.html','text!./templates/addEmployee.html', 'Classes/Accordion', 'initAccordionOnPage'], function (templateProject,templatePersone, Accordion, setAccordItem) {

    var Modal = function(object){
        this.template = object['template'];
        this.url = object['url'];
        this.render();

    };
    Modal.prototype = {
        render: function(){
            var self = this;
            var template = this.template;
            template = $(template);
//                console.log(t.find('*'))
            template.find('*').each(function(){
                var element = $(this);
                var point = element.attr('data-point');
                if(point) {
                    self[point] = element;
                }
            });

            $(template).appendTo($("#inner-board"));
            this.template = template;
            this.form =  $(template).find('input');
            this.setHandler();
        },
        setHandler: function(){
                var self = this;
                this.close.on('click', function () {
                   self.template.remove();

                });

                 if(this.datePicker)this.datePicker.datepicker();
                 this.submit.on('click', function () {
                        self.submitData();
                });
        },
        submitData: function(){
           var data = {};
            console.log(this.formD[0]);
           $(this.form).each(function(index,element){
               var name = $(element)[0]['name'];
               var value = $(element)[0]['value'];
               data[name] = value;
//               $(element).val('');
           });


           if(!data['name']){
//               alert ('you must fill in the name');
               this.ahtung
                   .html('you must fill in the name')
                   .css('color','red');
               return
           }
           if(this.datePicker){
                var date = new Date(data.startDate);
                date.setDate(date.getDate() + 1); //issue on server --> date -1 day
                data.startDate = date;
           }
           var url  = this.url;


            var x = this.formD[0];
            console.log(x);
           var formData = new FormData(x);
//            formData.append('vass',12)
//               $.extend(formData,data);

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (returndata) {
                        if(url =='/project'){
                            var obj = {id: returndata._id, name: returndata.name};
                            var item = "";
                            if (returndata.end) item = "Closed"
                            else item = "Open"
                            setAccordItem("projects", obj, item);
                        }
                        if(url == '/user') {
                            var obj = {id: returndata._id, name: returndata.name + " " + returndata.surname, status:returndata.currentStatus};
                            var item = "";
                            setAccordItem("people", obj, item);
                        }

                    }
            });
        }
    }
//        function create(){
//            var modal = new Modal({template:templ,url:'/project'})
//        }

        $("#buttonAddNewProject").on('click', function(){return new Modal({template:templateProject,url:'/project'})});
        $("#buttonAddNewPeople").on('click', function(){return new Modal({template:templatePersone,url:'/user'})});

});

