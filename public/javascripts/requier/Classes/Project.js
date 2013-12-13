define(['text!../templates/project.html', 'Classes/Person_new', '../innerContainer', '../drag&drop', '../Confirm'], function (template, Person, storage, transit) {

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
        this.searchName;

        this.id = id;


        //instance is a link to the project window domNode on the blackboard
        this.instance;

        //variable for project window title
        this.name;

        /*binding a custom event for adding new user into a project*/

        this.__construct = function () {
            this.renderView();
            this.buildLogic();

            storage.addObj(this)

        };
        this.__destruct = function () {
            self.instance.remove();
            storage.dropObj(this)
        };

        this.renderView = function () {
            /*declaring html template parts*/


            self.instance = $(template).appendTo($("#inner-board")).css({
                float: 'left'
            }).addClass('drop').attr('id', id);

            /** мой костыль для поиска на доске**/
            self.domNode = self.instance;

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


        this.addPerson = function (pers) {
            $.ajax({
                url: '/user',
                data: {id: pers},
                async: false,
                success: function (res) {
                    var person = new Person({id: res._id, projectID: id});
                    person.inProject = true;
                    self.searchName += person.searchName;
                    self.sortEmployee(person);
                }
            })
        };

        this.getProject = function () {
            $.ajax({
                url: '/project',
                data: {id: id},
                async: false,
                success: function (res) {
                    //set a name for this project
                    self.name = res.name;
                    self.searchName = self.name;
                    self.header.innerHTML = self.name;
                    self.addDrop();
                    // response has currentEmployees property, which is an array we have to analyze
                    for (var i in res.currentEmployees) {
                        //creating new Person instance form each record in currentEmployees array
                        var person = new Person({id: res.currentEmployees[i], projectID: id}); // add projectID:id *stepa
                        self.searchName = self.searchName + ' ' + person.searchName;
                        person.inProject = true;
                        self.sortEmployee(person);
                    }
                }
            })
        };

        this.addDrop = function () {
            jQuery(function () {
                $(self.domNode)
                    .drop(function (ev, dd) {
                        $(dd.proxy).remove();
                        $('.drop').css({
                            boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)"
                        })

                        transit({
                            domNode: dd.drag,
                            id: $(dd.drag).attr("data-id"),
                            lastProject: $(dd.drag).attr("data-parentproject"),
                            currentProject: dd.target.id,
                            action: 'transfer'
                        }, Person);
                    })
            });
        }

        this.sortEmployee = function (p) {/*we translate JSON(returned person) here, in "p" param */

            var
                projl = p.projectList,
                statl = p.statusList;

            //searching in array of projects current project key
            var idx = projl.indexOf(id),

            //searching an employee's status in current project
                status = statl[idx];

            //sort employees corresponding to them project status
            console.log(projl[projl.length], projl[projl.length-1]);
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

        this.toggleDevs = function () {
            $(self.devs).toggleClass('open');

            // label toggler

            self.toggleDevs_btn.innerHTML == 'show developers' ? self.toggleDevs_btn.innerHTML = 'hide developers' : self.toggleDevs_btn.innerHTML = 'show developers';
        };

        this.addTemplateHandlers = function () {

            /*adding custom event*/

            $('#inner-board').bind('addEmpl', function (e, pers, proj) {
                if(proj == id){self.addPerson(pers)};
            });

            /*template events*/

            $(self.toggleDevs_btn).on('click', self.toggleDevs);
            $(self.close).on('click', function () {
                self.__destruct();
            });
        };

//        at last, call of project constructor

        this.__construct();
    };
    return Project;
});

