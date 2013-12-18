define(['text!../templates/project.html', 'Classes/Person', '../StorageForObjectsOnBoard', '../modalConfirm', '../../thirdParty/jquery.event.drop-2.2'], function (template, Person, storage, Confirm) {

    /*
     * next files are required for following needs:
     * ********************************************
     * template - provides the html markup for project rendering
     * Person - allows to call person init and rendering from project method
     * storage - this file provides access to storage object - container for all objects on board
     * Confirm - this is a modal window, which appears in case of project changes,
     * *like an addition/deletion a person onto/from project
     * *********************************************
     * also a drag&drop plugin file is required. It allows a project to accept dropped people cards
     * */


    /*
     * this function helps to add drop event onto project window
     * */
    function transit(/*obj*/data, /*obj*/Person) {
        Confirm.init(data, Person);
    }


    /*
     * in project initialization we rendering view by adding template on board and
     * adding current employees into project window
     * then, storage updates with project instance
     */
    var Project = function (/*string*/id) {

        var self = this;
        this.id = id;
        this.template = template;


        this.renderView(this);
        this.buildLogic();

        this.processNewPerson = function (person) {
            self.searchName = self.searchName + ' ' + person.searchName;
            person.inProject = true;
            self.sortEmployee(person);
        };

        storage.addObj(this);

    };

    Project.prototype.getMe = function () {
        return this;
    }

    /*
     * remove project instance from board and form storage
     */
    Project.prototype.__destruct = function () {
        this.domNode.remove();
        storage.dropObj(this)
    };

    /* this function appends template onto board,
     * parsing template's key nodes and
     * adding event handlers to this nodes
     * */


    Project.prototype.renderView = function () {
        /*
         * adding template onto board, setting id and class for it
         * */
        this.domNode = $(this.template).appendTo($("#inner-board")).css({
            float: 'left'
        }).addClass('drop').attr('id', this.id);


        // Parsing template' nodes
        // Sorry for my ugly syntax, maybe we'd find solution
        // in switching data-attributes and classes to id's

        this.devs = this.domNode.find('[data-role=devs]')[0];
        this.leads = this.domNode.find('.leads')[0];
        this.mans = this.domNode.find('.mans')[0];
        this.close = this.domNode.find('button.close')[0];
        this.toggleDevs_btn = this.domNode.find('a[href="#show"]')[0];
        this.header = this.domNode.find('.project-header span')[0];

        this.addTemplateHandlers();
    };


    Project.prototype.buildLogic = function () {
        //return a project record from db or creates a new record
        !(typeof this == Object) ? this.getProject() : this.createProject();
    };


    Project.prototype.addPerson = function (pers) {

        var self = this;

        var strg = storage.storage;

        for (var i in strg) {
            if (strg[i].id === pers && strg[i].projectID === this.id) {
                $(strg[i].domNode).remove();
            }
        }
        console.log(pers);
        $.ajax({
            url: '/user',
            data: {id: pers},
            async: true,
            success: function (res) {
                console.log(res);
                var person = new Person({id: res._id, projectID: self.id, callback: self.processNewPerson});
            }
        });
    };

    Project.prototype.getProject = function () {

        var self = this;
        $.ajax({
            url: '/project',
            data: {id: this.id},
            async: true,
            success: function (res) {
                //set a name for self project
                self.name = res.name;
                self.searchName = self.name;
                self.header.innerHTML = self.name;
                self.addDrop();
                // response has currentEmployees property, which is an array we have to analyze
                for (var i in res.currentEmployees) {
                    //creating new Person instance form each record in currentEmployees array
                    var person = new Person({id: res.currentEmployees[i], projectID: self.id, callback: self.processNewPerson});
                }
            }
        });
    };

    Project.prototype.addDrop = function () {

        $(this.domNode)
            .drop(function (ev, dd) {
                $(dd.proxy).remove();
                $('.drop').css({
                    boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)"
                });

                transit({
                    domNode: dd.drag,
                    id: $(dd.drag).attr("data-id"),
                    lastProject: $(dd.drag).attr("data-parentproject"),
                    currentProject: dd.target.id,
                    action: 'transfer'
                }, Person);
            })

    };

    Project.prototype.sortEmployee = function (p) {/*we translate JSON(returned person) here, in "p" param */

        var
            projl = p.projectList,
            statl = p.statusList,
            self = this;

        //searching in array of projects current project key
        var idx = projl.indexOf(this.id),

        //searching an employee's status in current project
            status = statl[idx];
        //sort employees corresponding to them project status

        if (status == 2) {/*if employee's role is a manager*/
            $(p.domNode).appendTo(self.mans).css({
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

    Project.prototype.toggleDevs = function () {
        $(this.devs).toggleClass('open');

        // label toggler
        this.toggleDevs_btn.innerHTML == 'show developers' ? this.toggleDevs_btn.innerHTML = 'hide developers' : this.toggleDevs_btn.innerHTML = 'show developers';
    };

    Project.prototype.addTemplateHandlers = function () {

        /*adding custom event*/
        var self = this;

        $('#inner-board').bind('addEmpl', function (e, pers, proj) {
            (proj == self.id) ? self.addPerson(pers) : console.log('i am another project, my name is: ' + self.name);
        });

        /*template events*/

        $(this.toggleDevs_btn).on('click', $.proxy(this.toggleDevs, this));
        $(this.close).on('click', $.proxy(this.__destruct, this));
    };


    return Project;
});

