define(['./Classes/Accordion', '../thirdParty/bootstrap'], function (Accordion) {
    
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

        /*get all person statuses from DB*/
        $.ajax({
            type: "GET",
            url: "/status",
            async: false,
            success: function (dataStatus) {
                personStatuses = dataStatus;

            }
        })

        /*generate accordion "projects"*/
        $.ajax({
            type: "GET",
            url: "/projects",
            async: false,
            success: function (dataProject) {
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
            }
        })

        accordProjects = new Accordion(projects, "#accordion-projects");

        /*generate accordion "people"*/
        setTimeout(function () {
            $.ajax({
                type: "GET",
                url: "/users",
                async: false,
                success: function (dataPerson) {
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

                }
            });

            accordPeople = new Accordion(person, "#accordion-people");
            setSizes();

        }, 500)

        $(window).bind("resize", function () { //при изменении размера окна вызываем функцию
            setSizes();
        });

    })

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


