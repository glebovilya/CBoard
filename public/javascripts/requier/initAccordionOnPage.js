
define(['Classes/Accordion', '../thirdParty/bootstrap'], function (Accordion) {

    var accordProjects;
    var accordPeople;
    var personPosition;
    var divIdPeople = $("#accordion-people");
    var btnInIdPeople = $('#buttonAddNewPeople');
    var divIdProjects = $("#accordion-projects");
    var btnInIdProjects = $('#buttonAddNewProject');
    var projects;
    var person;

    var animateFreePersons = function(){
        var inSkillUp = divIdPeople.find('i.icon-fire');

        inSkillUp.each(function(){
                $(this).animate({
                    marginTop: '-10px'
                },{
                    duration:100,
                    complete: function(){
                        $(this).animate({
                            marginTop: '4px'
                        },{
                            duration:200,
                            complete: function(){
                                $(this).css('margin-top', 0)
                            }
                        })
                    }
                })
            }
        )
    }

    $(document).ready(function () {

        /* set the initial position of tabs elements and their changing */
        $('#people-tab').bind("click", function () {
            divIdProjects.css("left", -1000);
            btnInIdProjects.css("left", -1000);
            divIdPeople.css("left", 0);
            btnInIdPeople.css("left", 0);
            animateFreePersons()
        })
        $('#projects-tab').bind("click", function () {
            divIdPeople.css("left", -1000);
            btnInIdPeople.css("left", -1000);
            divIdProjects.css("left", 0);
            btnInIdProjects.css("left", 0);
        })


        /**
         * Sends req on server to get all statuses from DB
         * @returns {*|jQuery.ajax}
         */
        function getPositions(){return $.ajax({
            type: "GET",
            url: "/position",
            async: true
        })}

        function setStatuses (dataStatus) {
            personPosition = dataStatus;

        }

        /**
         * Sends req on server to get all projects
         * @returns {*|jQuery.ajax}
         */
        function getProjects(){return $.ajax({
            type: "GET",
            url: "/projects",
            async: true
        })}


        /**
         * generates accordion items and renders accordion in browser
         * @param dataProject
         */
        function setProjects (/*responded project list from server*/dataProject) {
            var project = {};
            var openProject = [];
            var closedProject = [];
            var skillUp = [];
            for (var elems in dataProject) {
                if (dataProject[elems].end) {
                    closedProject[closedProject.length] = {id: dataProject[elems]._id, name: dataProject[elems].name};
                }
                else {
                    if(dataProject[elems].name === 'SkillUp'){
                        skillUp.push({id: dataProject[elems]._id, name: dataProject[elems].name})
                    }
                    else {
                        openProject[openProject.length] = {id: dataProject[elems]._id, name: dataProject[elems].name};
                    }
                }
            }
            project.Open = openProject;
            project.Closed = closedProject;
            project.SkillUp = skillUp;
            projects = project;
//            debugger
            accordProjects = new Accordion(projects, "#accordion-projects");
        }


        /**
         * gets all users from server`s DB
         * @returns {*|jQuery.ajax}
         */
        function getUsers() {return $.ajax({
            type: "GET",
            url: "/users",
            async: true
        })}

        /**
         * generates accordion items and renders accordion in browser
         * @param dataPerson
         */
        function setUsers (dataPerson) {
            var people = {};
            for (var elems in dataPerson) {
                for (var stat in personPosition) {
                    if (personPosition[stat]._id == dataPerson[elems].position)
                        var item = personPosition[stat].name;
                }
                if (item in people)
                    people[item][people[item].length] = {id: dataPerson[elems]._id + "", name: dataPerson[elems].name + " " + dataPerson[elems].surname, inSkillUpFrom: dataPerson[elems].inSkillUpFrom};
                else
                    people[item] = [
                        {id: dataPerson[elems]._id + "", name: dataPerson[elems].name + " " + dataPerson[elems].surname, inSkillUpFrom: dataPerson[elems].inSkillUpFrom}
                    ];
            }
            person = people;
            accordPeople = new Accordion(person, "#accordion-people");
        }

        $.when(getPositions(), getProjects(), getUsers())
            .then(function(dataPositions, dataProjects, dataPerson){
                setStatuses (dataPositions[0]);
                setProjects(dataProjects[0]);
                setUsers(dataPerson[0]);
                setSizes();
            })
            .fail(function(){
                window.location.href = "http://127.0.0.1:3000/404"
            });

        $(window).bind("resize", function () { //при изменении размера окна вызываем функцию
            setSizes();
        });

    });

    function setSizes() {
        var topHeight = $('div.custom-view').outerHeight() + $('#search').outerHeight();
        var bottomHeight = $('div.btn-wrap').outerHeight();

        var headsProj = divIdProjects.find('div.accordion-heading').length;
        var headsPeop = divIdPeople.find('div.accordion-heading').length;

        divIdProjects.find('ul.list').height($('div.wrap').height() - topHeight - bottomHeight - 30*headsProj - 40)
        divIdPeople.find('ul.list').height($('div.wrap').height() - topHeight - bottomHeight - 30*headsPeop - 40)

    }

    function setAccordItems(type, obj, item) {

        if (type == "projects") {
            accordProjects.addItem(obj, item);
        }
        if (type == "people") {
            for (var stat in personPosition) {
                if (personPosition[stat]._id == obj.position)
                    var item = personPosition[stat].name;
            }
            accordPeople.addItem(obj, item);
        }
    }
    $.setAccordionItem = setAccordItems;

    return setAccordItems
})


