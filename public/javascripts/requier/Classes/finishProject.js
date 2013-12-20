/**
 * Created by glebov on 12/19/13.
 */
define([
    'text!../templates/finishProject.html',
    '../../thirdParty/bootstrap-datepicker'],

    function (template, datepicker) {

        var FinishWindow = function (/*object*/project) {

            var self = this;
            this.render(project);


        };

        FinishWindow.prototype.processFinish = function (project) {

            this.pickDate();

            console.log(this);
            console.log(this.finishDate);

            $.ajax({
                url: '/project/' + project.id,
                type: "POST",
                data: {date: this.finishDate},
                success: function () {
                    project.__destruct();
                }
            });

            this.accMove(project);
            this.__destruct();
        };

        FinishWindow.prototype.render = function (project) {

            this.finishDate = null;

            $(template).appendTo('body');

            this.parseTemplate();

            this.dateFix();

            this.addHandlers(project);

            this.dp.datepicker();

        };

        FinishWindow.prototype.parseTemplate = function () {


            this.finishBtn = $("#finish-btn");
            this.dp = $('#datepicker-input');
            this.dateInp = $('input[name="finishDate"]');
            this.close = $('#modalFinishProject .close')[0];

        };

        FinishWindow.prototype.addHandlers = function (project) {
            var self = this;
            $(this.finishBtn).on('click', function () {
                    (!project.end) ? self.processFinish(project) : self.__destruct();
                }
            );

            $(this.close).on('click',function(){
                console.log(self);
                self.__destruct();
            })

        }

        FinishWindow.prototype.pickDate = function () {

            this.finishDate = new Date($(this.dateInp).val());
            this.finishDate.setDate(this.finishDate.getDate() + 1);

        };

        FinishWindow.prototype.accMove = function(project){

            if(!project['end']){
                $.setAccordionItem('projects',project,'Closed');
                $("#Open-group").find('li[data-point-id="'+project.id+'"]')[0].remove();
            };
        };

        FinishWindow.prototype.dateFix = function(){

            var d = new Date();
            $(this.dateInp).val((d.getMonth()+1) + "/"+d.getDate() + "/" + d.getFullYear());

        };

        FinishWindow.prototype.__destruct = function(){

            $('#finish').remove();
        };

        return FinishWindow;
    }
)