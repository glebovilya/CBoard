/*
 * Created by stepanjuk on 02.12.13.
 */

define(['text!./templates/confirmYesNo.html','text!./templates/addProject.html','text!./templates/addEmployee.html'/*, 'Classes/Accordion', 'initAccordionOnPage'*/], function (templateConfirm, templateProject,templatePersone/*, Accordion, setAccordItem*/) {


    /**
     * crete modal window depending on received arguments
     * @param object {template:template...,url:'/...'}
     * @constructor
     */
    var Modal = function(object){
        this.template = object['template'];
        this.url = object['url'];
        this.render();

    };

    Modal.prototype = {
        // after rendering you can call domNode element by name. Call function setHandler()
        render: function(){
            var self = this;
            var template = this.template;
            template = $(template);
            template.find('*').each(function(){
                var element = $(this);
                var point = element.attr('data-point');
                var renderEvent = element.attr('data-event');
                if(point) {
                    self[point] = element;
                }
                if(renderEvent){
                    self.attachEvent(element,renderEvent);
                }
            });


            $(template).appendTo($("#inner-board"));
            this.template = template;
            this.form =  $(template).find('input');

            var cover =document.createElement('div');
            document.body.appendChild(cover);
            $(cover).addClass('cover');
            this.cover = cover;

            this.setHandler();
        },
        attachEvent: function( element, renderEvent){
            var self = this;
//            console.log(element)

            var arrRenderEvent = renderEvent.split(','),
                parts = [],
                evtName = "",
                methodName = "";
            $.each(arrRenderEvent, function(idx, definition) {
                // split definition to [DOMEventName,DOMEventHandler] pair
                parts = definition.split(':');
                    evtName = parts[0];
                methodName = parts[1];

                // bind Widget method to DOMElement event
                element.on(evtName, $.proxy(self[methodName], self))
            })
        },
        removeDomNode: function(){
            this.template.remove();
            this.cover.remove();
        },
        // set independent element handlers to document.body and metod jQuery - datePicker
        setHandler: function(){
//            console.log(this)
            var self = this;
                $('body').one('keydown',function(event){
                    if(event.which ==13){
                        self.submitData();
                    }
                    if(event.which ==27){
                        self.removeDomNode();
                    }
                });

                if(this.datePicker)this.datePicker.datepicker();
        },
        validatorPress: function(){
            var self = this;
            var char =$(event.target).val();

            if(event.which ==13) {
                this. submitData();
            }

            if(((event.which >=60) && (event.which <=62)) || ((event.which >=91) && (event.which <=94)) || ((event.which >=123) && (event.which <=125))){
                $(event.target).one('keyup', function(){
                    $(event.target).val(char)
                    self.ahtung.html('name can not contain special characters');
                    setTimeout(function(){self.ahtung.html('')}, 1000);
                    return
                })
            }

        },
        validationForSubmit:function(){
            if(this.nameInForm){
                var nameValue = $(this.nameInForm).val();
                if(this.surnameInForm) var surnameValue = $(this.surnameInForm).val();
                if((nameValue) && /\W\s/.test(nameValue) || ((surnameValue) && /\W/.test(surnameValue))){
                    this.ahtung.html('you have been warned...');
                    this.nameInForm.val('');

                    return true;
                }

                  if(nameValue && !/\S/.test(nameValue)){
                      this.ahtung
                          .html('name can not consist only of whitespace');
                      return true;
                  }
                  if(!nameValue){
                      this.ahtung
                          .html('you must fill in the name');
                      return true;
                  }
            }
        },
        validatorForProcess:function(event){
            if(((event.which >=60) && (event.which <=64)) || ((event.which >=91) && (event.which <=94)) || ((event.which >=123) && (event.which <=125))){
                this.ahtung.html('name can not contain special characters');
            }

        },
        // function validation and creating AJAX and init new li by accordion
        submitData: function(){
            var validator = this.validationForSubmit();
            if(validator) return false;
            var self = this;
            var data = {};
            $(this.form).each(function(index,element){
               var name = $(element)[0]['name'];
               var value = $(element)[0]['value'];
               data[name] = value;

            });

            if(this.datePicker){
                 var date = new Date(data.startDate);
                 date.setDate(date.getDate() + 1); //issue on server --> date -1 day
                 data.startDate = date;
            }


            var url  = this.url;
            var form = this.formD[0];
            var formData = new FormData(form);

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
//                            setAccordItem("projects", obj, item);
                        }
                        if(url == '/user') {
                            var obj = {id: returndata._id, name: returndata.name + " " + returndata.surname, position:returndata.position};
                            var item = "";
//                            setAccordItem("people", obj, item);
                        }
                        self.removeDomNode();
                    }
                });
            }

    };


      $("#buttonAddNewProject").on('click', function(){return new Modal({template:templateProject,url:'/project'})});
        $("#buttonAddNewPeople").on('click', function(){return new Modal({template:templatePersone,url:'/user'})});
    return Modal;
});

