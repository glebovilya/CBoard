define([
    'text!../templates/project.html',
    'Classes/Person',
    '../StorageForObjectsOnBoard',
    '../Confirm',
    'Classes/finishProject',
    '../../thirdParty/jquery.event.drop-2.2'
],

    function (template, Person, storage, Confirm, FinishWindow) {

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
            new Confirm(data, Person);
        }


        /*
         * in project initialization we rendering view by adding template on board, parse it and
         * adding current employees into project window
         * then, storage updates with project instance
         */
        var Project = function (/*string*/id) {

            /*link for inner use of project class instance*/
            var self = this;

            this.id = id;
            this.template = template;
            this.end = null;
            this.dropTo = null;

            this.renderView();
            this.buildLogic();

            this.processNewPerson = function (/*obj*/person) {
                self.searchName = self.searchName + ' ' + person.searchName;
                person.inProject = true;
                self.sortEmployee(person);
            };

            storage.addObj(/*obj*/this);

        };

        /*
         * remove project instance from board and form storage
         */
        Project.prototype.__destruct = function () {
            this.domNode.remove();
            storage.dropObj(/*obj*/this)
        };

        /* this function appends template onto board,
         * parsing template's key nodes and
         * adding event handlers to this nodes
         * */

        Project.prototype.renderView = function () {
            /*
             * adding template onto board, setting id and dropability class for it
             * */
            this.domNode = $(this.template).appendTo($("#inner-board")).css({
                float: 'left'
            }).attr('id', this.id);
            $((this.domNode).find('.project-body')[0]).addClass('drop');


            // Parsing template' nodes
            // Sorry for my ugly syntax, maybe we'd find solution
            // in switching data-attributes and classes to id's

            this.devs = this.domNode.find('[data-role=devs]')[0];
            this.leads = this.domNode.find('.leads')[0];
            this.mans = this.domNode.find('.mans')[0];
            this.close = this.domNode.find('button.close')[0];
            this.toggleDevs_btn = this.domNode.find('a[href="#show"]')[0];
            this.header = this.domNode.find('.project-header span')[0];
            this.finish = this.domNode.find('a[href="#finish"]')[0];

            /*adding event handlers to template's nodes after we parse it*/
            this.addTemplateHandlers();
        };


        /*
         *  now this function contains just an another function call, but it can be extend in future
         * */
        Project.prototype.buildLogic = function () {
            //return a project record from db
            this.getProject();
        };


        /*
         * Adding person record to the storage,
         * then render this person card in project window
         * */
        Project.prototype.addPerson = function (/*int*/pers) {

            var self = this;
            var strg = storage.storage;

            /*
             * Finding this person in storage, then looking for his/her last project,
             * if this value equals to current project, removing old person card from project window,
             * then appending new one
             * *******************************************
             * this functionality was predicated by case of change inner project role of current person,
             * for example, when developer becomes lead
             * */

            for (var i in strg) {
                if (strg[i].id === pers && strg[i].projectID === this.id) {
                    $(strg[i].domNode).remove();
                }
            }

            /*
             * in this request' callback we construct a new person card,
             * returned from Classes/Person.js
             * -----------------------------------
             * Because of outer function call, context point out to document.window, so we need to declare
             * project instance context and callback function as a current project instance method directly in
             * project constructor //todo: find solution to avoid in-constructor way of declaration
             */

            $.ajax({
                url: '/user',
                data: {id: pers},
                async: true,
                success: function (res) {
                    var person = new Person({id: res._id, projectID: self.id, callback: self.processNewPerson});
                }
            });
        };

        /*
         * This method requesting a project record from db,
         * respond comes in JSON format, so we takes a project name from it to render corresponding node in project template,
         * then we fetching currentEmployees array to render every employee in project
         * */


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
                    self.end = res.end;
                    self.addDropToEmployeeAreas();
                    // response has currentEmployees property, which is an array we have to analyze
                    for (var i in res.currentEmployees) {
                        //creating new Person instance form each record in currentEmployees array
                        var person = new Person({id: res.currentEmployees[i], projectID: self.id, callback: self.processNewPerson});
                    }
                }
            });
        };

        /*
        *
        * Logic of drop addition was changed because of need to select drop area.
        * Now drop event adding to managers, team leads and developers areas separately
        * This allows us to pick up different drop event target - mans, devs or leads div
        *
        * */

        Project.prototype.addDropToEmployeeAreas = function(){
            this.addDropEvent(this.mans);
            this.addDropEvent(this.leads);
            this.addDropEvent(this.devs);
        };

        /*
         * This method contains function, which was taken from outer plugin.
         * Allow dropability to current project template on board and some styles for containers.
         * You can find full reference of this work logic in public/javascripts/thirdParty/jquery.event.drop-2.2.js
         * To disallow ability to recieve person cards, end date property check was added.
         * */


        Project.prototype.addDropEvent = function (div) {

            var self = this;

            $(div)
                .drop(function (ev, dd) {
                    if(!this.end){
                        console.log(self.name);
                        $(dd.proxy).remove();
                        $('.drop').css({
                            boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)"
                        });

                        if(self.name != 'SkillUp'){
                            self.dropTo = dd.drop[0];
                            transit({
                                domNode: dd.drag,
                                id: $(dd.drag).attr("data-id"),
                                lastProject: $(dd.drag).attr("data-parentproject"),
                                currentProject: self.id,
                                action: 'transfer',
                                status: dd.drag.status
                            }, Person);
                        }
                    }
                });
        };

        /*
         * Method recieving a JSON - person instance,
         * parse it's project list and status list to find person status in current project.
         * Basing on status, person card render in different areas of project template
         * */

        Project.prototype.sortEmployee = function (/*object*/p) {

            var
                projl = p.projectList,
                statl = p.statusList,
                self = this;

            //searching in array of projects current project key
            var idx = projl.indexOf(this.id),

            //searching an employee's status in current project
                status = statl[idx];
            //sort employees corresponding to them project status

            if (p.inSkillUpFrom) {
                $(p.domNode).find('.close').remove();
            };

            if (status == 2 || self.dropTo == self.mans) {/*if employee's role is a manager*/
                $(p.domNode).appendTo(self.mans).css({
                    float: 'left',
                    position: 'relative'
                })
            } else if (status == 3 || self.dropTo == self.leads) {/*if employee's role is a group lead*/
                $(p.domNode).appendTo(self.leads).css({
                    float: 'right',
                    position: 'relative'
                })
            } else {/*otherwise employee is assigned*/
                $(p.domNode).appendTo(self.devs).css({
                    float: 'left',
                    position: 'relative'
                })
            }

        };

        /*
         * Toggling class for show/hide developers block in project and switch toggle button label
         * */

        Project.prototype.toggleDevs = function () {
            $(this.devs).toggleClass('open');

        // label toggler
            this.toggleDevs_btn.innerHTML == 'show developers' ? this.toggleDevs_btn.innerHTML = 'hide developers' : this.toggleDevs_btn.innerHTML = 'show developers';
        };

        /*
         * Adding event handlers to the parsed project template
         * */

        Project.prototype.addTemplateHandlers = function () {

            /*adding custom event*/
            var self = this;

            $('#inner-board').bind('addEmpl', function (/*event object - not used*/e, /*int:person ID*/pers, /*this project ID*/proj) {
                (proj == self.id) ? self.addPerson(pers) : /*nothing*/true;
            });

            /*template events*/

            $(this.toggleDevs_btn).on('click', $.proxy(this.toggleDevs, this));
            $(this.close).on('click', $.proxy(this.__destruct, this));
            $(this.finish).on('click', $.proxy(this.finishProject, this));
            $(this.finish).on('click', $.proxy(this.removeDrop, this));
        };

        /*
         * Finishing project developing, adding project record and last employees list to history/finishedProjects and
         * to accordion category closed
         * */
        Project.prototype.finishProject = function () {
            var finish = new FinishWindow(this);
        };

        return Project;
    });


