define(['Accordion', '../thirdParty/bootstrap', 'resize', 'scroll' ], function (Accordion, boot) {
    var accordProjects;
    var accordPeople;
    var userStatuses;
    $(document).ready(function () {

        $("#people").css("left", -1000);
        $('#people-tab').bind("click", function () {
            $("#projects").css("left", -1000);
            $("#people").css("left", 0);
        })
        $('#projects-tab').bind("click", function () {
            $("#people").css("left", -1000);
            $("#projects").css("left", 0);
        })

        $.ajax({
            type: "GET",
            url: "/status",
            async: false,
            success: function (dataStatus) {
                userStatuses = dataStatus;
                console.log(userStatuses)
            }
        })
        /*generate accordion "projects"*/
        var projects;
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
                project.open = openProject;
                project.closed = closedProject;
                projects = project;
            }
        })
        accordProjects = new Accordion(projects, "#accordion-projects");

        /*generate accordion "people"*/
        function setPeople() {

        }

        setTimeout(function () {
            var peop;
            $.ajax({
                type: "GET",
                url: "/users",
                async: false,
                success: function (dataPerson) {
                    var people = {};
                    for (var elems in dataPerson) {
                        for (var stat in userStatuses) {
                            if (userStatuses[stat]._id == dataPerson[elems].currentStatus)
                                var itemk = userStatuses[stat].name;
                        }
                        if (itemk in people)
                            people[itemk][people[itemk].length] = {id: dataPerson[elems]._id + "", name: dataPerson[elems].name + " " + dataPerson[elems].surname};
                        else
                            people[itemk] = [
                                {id: dataPerson[elems]._id + "", name: dataPerson[elems].name + " " + dataPerson[elems].surname}
                            ];
                    }
                    peop = people;
                }
            });
            accordPeople = new Accordion(peop, "#accordion-people");

            setScroll('.container-scroll', '.scroller', '.scroller__bar');
            setSizes();

        }, 500)

        $(window).bind("resize", function () { //при изменении размера окна вызываем функцию
            setSizes();
        });
    })

    function setScroll(container, scroller, scroll) {
        baron({
            root: container,
            scroller: scroller,
            bar: scroll,
            barOnCls: 'baron'
        }).fix({
                elements: '.header__title',
                outside: 'header__title_state_fixed',
                before: 'header__title_position_top',
                after: 'header__title_position_bottom',
                clickable: true

            });
    }

    function setSizes() {
        $('div#inner-board').height($('div#board').height() - 18);
        $('div#inner-board').width($('div#board').width() - 18);
        var topHeight = $('div.custom-view').outerHeight() + $('#search').outerHeight();
        var hContainerScroll = $(window).innerHeight() - 2 * $('div.line').outerHeight() - $('#buttonAddNewPeople').outerHeight() - 2 * $('#showAll').outerHeight() - topHeight - 20;
        $('div.container-scroll').height(hContainerScroll)
        var topHeightPeople = $('#people div.scroller').outerHeight() + $('div.line').outerHeight() + $('#buttonAddNewPeople').outerHeight()
        $('#people').css("top", -topHeightPeople);
        $('div.btn-wrap').css("top", topHeight + $("#people").outerHeight())
    }

    function setAccordItems(type, obj, item) {

        if (type == "projects") {
            console.log(accordProjects);
            accordProjects.addItem(obj, item);
        }
        if (type == "people") {
            console.log(accordPeople);
            for (var stat in userStatuses) {
                if (userStatuses[stat]._id == obj.status)
                    var item = userStatuses[stat].name;
            }
            accordPeople.addItem(obj, item);
        }
    }

    return setAccordItems
})


