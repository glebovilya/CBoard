define(['text!../templates/project.html', 'Classes/Person'], function (template, Person) {

    var Project = function (/*string*/id) {

        //declaration of Project class
        /*
         * A container, horizontally split on two logical areas:
         *top:
         * contains person widgets of project manager and group leads
         *bottom:
         * this area is a container for displaying developers list
         * */

        // object alias for inner usage
        var self = this;

        this.__construct = function () {
            this.renderView();
            this.buildLogic();
        };
        this.__destruct = function () {
            self.instance.remove();
        };

        this.renderView = function () {
            /*declaring html template parts*/
            var devs, leads, close, toggleDevs_btn, header;

            self.instance = $(template).appendTo($("#inner-board")).css({
                float: 'left'
            }).addClass('drop').attr('id', id);

            // Parsing template' nodes
            // Sorry for my ugly syntax, maybe we'd find solution
            // in switching data-attributes and classes to id's
            devs = $('#' + id).find('[data-role=devs]')[0];
            leads = $('#' + id).find('[data-role=leads]')[0];
            close = $('#' + id).find('button.close')[0];
            toggleDevs_btn = $('#' + id).find('a[href="#show"]')[0];
            header = $('#' + id).find('.project-header span')[0];
            console.log(self);
//            header.innerHTML = self.name();

            this.addTemplateHandlers(devs, close, toggleDevs_btn);
        };

        this.buildLogic = function () {
            //return a project record from db or creates a new record
            !(typeof self == Object) ? this.getProject() : this.createProject();
        };

        this.getProject = function () {
            $.ajax({
                url: '/project',
                data: {id: id},
                async: false,
                success: function (res) {
                    // response has currentEmployees property, which is an array we have to analyze
                    for (var i in res.currentEmployees) {
                        //creating new Person instance form each record in currentEmployees array
                        var person = Person.init({id: res.currentEmployees[i]});
                        self.sortEmployee(person);
                    }
                }
            })
        };

        this.sortEmployee = function (p) {/*we translate JSON(returned person) here, in "p" param */

            var
                projl = p.projectList,
                statl = p.statusList,
                devs = $('#' + id).find('[data-role=devs]')[0],
                leads = $('#' + id).find('[data-role=leads]')[0];

            //searching in array of projects current project key
            var idx = projl.indexOf(id);

            //searching an employee's status in current project
            status = statl[idx];

            //sort employees corresponding to them project status

            if (status == 2) {/*if employee's role is a manager*/
                $(p.domNode).appendTo(leads).css({
                    float: 'left',
                    position: 'relative'
                })
            } else if (status == 3) {/*if employee's role is a group lead*/
                $(p.domNode).appendTo(leads).css({
                    float: 'right',
                    position: 'relative'
                })
            } else {/*otherwise employee is a developer*/
                $(p.domNode).appendTo(devs).css({
                    float: 'left',
                    position: 'relative'
                })
            }
        };

        this.toggleDevs = function(devs){
            console.log(1);
            $(devs).toggleClass('open');
        };

        this.addTemplateHandlers = function (devs, close, toggleDevs_btn) {
            $(toggleDevs_btn).on('click',self.toggleDevs(devs));
            $(close).on('click', function () {
                self.__destruct();
            });

        };


        //instance is a link to the project window domNode on the blackboard
        this.instance;
        //variable for project window title
        this.name;

//        at last, call of project constructor

        this.__construct();
    };
    return Project;
});

