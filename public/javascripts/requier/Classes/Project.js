
define(['text!../templates/project.html', 'Classes/Person', '../StorageForObjectsOnBoard', '../modalConfirm', '../../thirdParty/jquery.event.drop-2.2'], function (template, Person, storage, Confirm) {

    function transit(data,Person){
        Confirm.init(data,Person);
    }

    var Project = function (/*string*/id) {

        this.id = id;
        this.template = template;

        this.renderView();
        this.buildLogic();

        storage.addObj(this);

    }

    Project.prototype.__destruct = function () {
        this.domNode.remove();
        storage.dropObj(this)
    };

    Project.prototype.renderView = function () {

        this.domNode = $(this.template).appendTo($("#inner-board")).css({
            float: 'left'
        }).addClass('drop').attr('id', this.id);


        // Parsing template' nodes
        // Sorry for my ugly syntax, maybe we'd find solution
        // in switching data-attributes and classes to id's

        this.devs = this.domNode.find('[data-role=devs]')[0];
        this.leads = this.domNode.find('[data-role=leads]')[0];
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
        for(var i in strg) {
            if(strg[i].id === pers && strg[i].projectID === this.id){
                $(strg[i].domNode).remove();
            }
        }
        $.ajax({
            url: '/user',
            data: {id: pers},
            async: false,
            success: function (res) {
                console.log(res);
                var person = new Person({id: res._id, projectID: self.id});
                person.inProject = true;
                self.sortEmployee(person);
                self.searchName += person.searchName
            }
        })
    };

    Project.prototype.getProject = function () {

        var self = this;

        $.ajax({
            url: '/project',
            data: {id: this.id},
            async: false,
            success: function (res) {
                //set a name for self project
                self.name = res.name;
                self.searchName = self.name;
                self.header.innerHTML = self.name;
                self.addDrop();
                // response has currentEmployees property, which is an array we have to analyze
                for (var i in res.currentEmployees) {
                    //creating new Person instance form each record in currentEmployees array
                    var person = new Person({id: res.currentEmployees[i], projectID: self.id}); // add projectID:id *stepa
                    self.searchName = self.searchName + ' ' + person.searchName;
                    person.inProject = true;
                    self.sortEmployee(person);
                }
            }
        })
    };

    Project.prototype.addDrop = function () {

        $(this.domNode)
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

    }

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

        $(this.toggleDevs_btn).on('click', $.proxy(this.toggleDevs,this));
        $(this.close).on('click', $.proxy(this.__destruct, this));
    };

    return Project;
});

