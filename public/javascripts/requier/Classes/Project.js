define(['text!../templates/project.html', 'Classes/Person'], function (template, Person) {

    var Project = function (/*string*/id) {

        //declaration of Project class
        /*
         * A container, horizontally split on two logical areas:
         *top:
         * contains person widgets of project manager and group leads
         *bottom:
         * this area is a container for displaying developers list
         * and is acceptor for drop event of draggable person widgets
         * */

        // object alias
        var self = this;

        this.__construct = function () {
            this.renderView();
            this.buildLogic();
        };
        this.__destruct = function () {
            self.instance.remove();
        };

        this.renderView = function () {
            /*tid - alias for id property, helps to no overwrite it*/
            var devs, leads, close, toggleDevs_btn;

            self.instance = $(template).appendTo($("#inner-board")).css({
                float: 'left'
            }).addClass('drop').attr('id', id);

            // Parsing template' nodes
            // Sorry for my ugly syntax, maybe if we'd find solution
            // in switching data-attributes and classes to id's
            devs = $('#' + id).find('[data-role=devs]')[0];
            leads = $('#' + id).find('[data-role=leads]')[0];
            close = $('#' + id).find('button.close')[0];
            toggleDevs_btn = $('#' + id).find('a[href="#show"]')[0];

            this.addTemplateHandlers(devs, close, toggleDevs_btn);
        };

        this.addTemplateHandlers = function (devs, close, toggleDevs_btn) {
            $(toggleDevs_btn).on('click', function toggleDevs() {
                $(devs).toggleClass('open');
            });
            $(close).on('click', function () {
                self.__destruct();
            });

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

        this.sortEmployee = function (p) {/*we translate JSON(returned person) here*/

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


        //instance is a link to the project window domNode on the blackboard
        this.instance;

//        at last, call of project constructor

        this.__construct();
    };
    return Project;
});

