define(['Accordion', '../thirdParty/bootstrap', 'resize', 'scroll' ], function (Accordion, boot) {

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
        new Accordion(projects, "#accordion-projects");

        /*generate accordion "people"*/
        function setPeople(){

        }
        setTimeout(function(){
            var peop;
            $.ajax({
                type: "GET",
                url: "/users",
                async: false,
                success: function (dataPerson) {
                    var people = {};
                    for (var elems in dataPerson) {
                        var itemk = dataPerson[elems].position
                        if (itemk in people)
                            people[itemk][people[itemk].length] = {id: dataPerson[elems]._id + "", name: dataPerson[elems].name};
                        else
                            people[itemk] = [
                                {id: dataPerson[elems]._id + "", name: dataPerson[elems].name}
                            ];
                    }
                    peop = people;
                }
            });
            new Accordion(peop, "#accordion-people");

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
})


