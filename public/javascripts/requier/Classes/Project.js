define(['text!../templates/project.html', 'Classes/Person_new'], function (template, Person) {

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


        //template map points of project window
        this.devs;
        this.leads;
        this.close;
        this.toggleDevs_btn;
        this.header;

        //instance is a link to the project window domNode on the blackboard
        this.instance;
        //variable for project window title
        this.name;

        this.__construct = function () {
            this.renderView();
            this.buildLogic();
        };
        this.__destruct = function () {
            self.instance.remove();
        };

        this.renderView = function () {
            /*declaring html template parts*/

            self.instance = $(template).appendTo($("#inner-board")).css({
                float: 'left'
            }).addClass('drop').attr('id', id);

            // Parsing template' nodes
            // Sorry for my ugly syntax, maybe we'd find solution
            // in switching data-attributes and classes to id's

            self.devs = $('#' + id).find('[data-role=devs]')[0];
            self.leads = $('#' + id).find('[data-role=leads]')[0];
            self.close = $('#' + id).find('button.close')[0];
            self.toggleDevs_btn = $('#' + id).find('a[href="#show"]')[0];
            self.header = $('#' + id).find('.project-header span')[0];

            self.addTemplateHandlers();
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
                    //set a name for this project
                    self.name = res.name;
                    self.header.innerHTML = self.name;
                    // response has currentEmployees property, which is an array we have to analyze
                    for (var i in res.currentEmployees) {
//                        console.log(res.currentEmployees[i])
                        //creating new Person instance form each record in currentEmployees array
                        var person = new Person({id: res.currentEmployees[i]});
                        self.sortEmployee(person);
                    }
                }
            })
        };

        this.sortEmployee = function (p) {/*we translate JSON(returned person) here, in "p" param */

            var
                projl = p.projectList,
                statl = p.statusList;

            //searching in array of projects current project key
            var idx = projl.indexOf(id),

            //searching an employee's status in current project
            status = statl[idx];

            //sort employees corresponding to them project status

            if (status == 2) {/*if employee's role is a manager*/
                $(p.domNode).appendTo(self.leads).css({
                    float: 'left',
                    position: 'relative'
                })
            } else if (status == 3) {/*if employee's role is a group lead*/
                $(p.domNode).appendTo(self.leads).css({
                    float: 'right',
                    position: 'relative'
                })
            } else {/*otherwise employee is a developer*/
                $(p.domNode).appendTo(self.devs).css({
                    float: 'left',
                    position: 'relative'
                })
            }
        };

        this.toggleDevs = function(){
            console.log('called');
            $(self.devs).toggleClass('open');
        };

        this.addTemplateHandlers = function () {
            $(self.toggleDevs_btn).on('click',self.toggleDevs);
            $(self.close).on('click', function () {
                self.__destruct();
            });
        };

//        at last, call of project constructor

        this.__construct();
    };
    return Project;
});

