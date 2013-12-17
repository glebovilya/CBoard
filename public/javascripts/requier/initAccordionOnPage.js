
define(['Classes/Accordion', '../thirdParty/bootstrap'], function (Accordion) {

    var accordProjects;
    var accordPeople;
    var personStatuses;
    var divIdPeople = $("#accordion-people");
    var btnInIdPeople = $('#buttonAddNewPeople');
    var divIdProjects = $("#accordion-projects");
    var btnInIdProjects = $('#buttonAddNewProject');
    var projects;
    var person;
    $(document).ready(function () {

        /* set the initial position of tabs elements and their changing */
        $('#people-tab').bind("click", function () {
            divIdProjects.css("left", -1000);
            btnInIdProjects.css("left", -1000);
            divIdPeople.css("left", 0);
            btnInIdPeople.css("left", 0);
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
        function getStatuses(){return $.ajax({
            type: "GET",
            url: "/status",
            async: true
        })}

        function setStatuses (dataStatus) {
            personStatuses = dataStatus;

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
            for (var elems in dataProject) {
                if (dataProject[elems].end)
                    closedProject[closedProject.length] = {id: dataProject[elems]._id, name: dataProject[elems].name};
                else
                    openProject[openProject.length] = {id: dataProject[elems]._id, name: dataProject[elems].name};
            }
            project.Open = openProject;
            project.Closed = closedProject;
            projects = project;
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
                for (var stat in personStatuses) {
                    if (personStatuses[stat]._id == dataPerson[elems].currentStatus)
                        var itemk = personStatuses[stat].name;
                }
                if (itemk in people)
                    people[itemk][people[itemk].length] = {id: dataPerson[elems]._id + "", name: dataPerson[elems].name + " " + dataPerson[elems].surname};
                else
                    people[itemk] = [
                        {id: dataPerson[elems]._id + "", name: dataPerson[elems].name + " " + dataPerson[elems].surname}
                    ];
            }
            person = people;
            accordPeople = new Accordion(person, "#accordion-people");
        }

        $.when(getStatuses(), getProjects(), getUsers())
            .then(function(dataStatus, dataProjects, dataPerson){
                setStatuses (dataStatus[0]);
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
            for (var stat in personStatuses) {
                if (personStatuses[stat]._id == obj.status)
                    var item = personStatuses[stat].name;
            }
            accordPeople.addItem(obj, item);
        }
    }

    return setAccordItems
})


