define(['Accordion', '../thirdParty/bootstrap', 'resize', 'scroll' ], function (Accordion, boot) {
    var accordProjects;
    var accordPeople;
    var personStatuses;
    var divIdPeople = $("#people");
    var divIdProjects = $("#projects");
    var projects;
    var person;
    $(document).ready(function () {


        /* set the initial position of tabs elements and their changing*/

        divIdPeople.css("left", -1000);
        $('#people-tab').bind("click", function () {
            divIdProjects.css("left", -1000);
            divIdPeople.css("left", 0);
        })
        $('#projects-tab').bind("click", function () {
            divIdPeople.css("left", -1000);
            divIdProjects.css("left", 0);
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
//       setTimeout(setSizes,200);
//        setSizes();
//        setScroll('.container-scroll', '.scroller', '.scroller__bar','baron');
//        setScroll('.container-scroll-2', '.scroller-2', '.scroller__bar-2', 'baron-2');


        $(window).bind("resize", function () { //при изменении размера окна вызываем функцию
            setSizes();

        });
    })

    function setScroll(container, scroller, scroll, bon) {
        baron({
            root: container,
            scroller: scroller,
            bar: scroll,
            barOnCls: bon
        });
//            .fix({
//                elements: '.header__title',
//                outside: 'header__title_state_fixed',
//                before: 'header__title_position_top',
//                after: 'header__title_position_bottom',
//                clickable: true
//
//            });
    }

    function setSizes() {
        $('div#inner-board').height($('div#board').height() - 18);
        $('div#inner-board').width($('div#board').width() - 18);

        var topHeight = $('div.custom-view').outerHeight() + $('#search').outerHeight();
        var bottomHeight = $('#showAll').outerHeight()+ parseInt($('#showAll').css("top"));


        var hContainerScroll = $(window).innerHeight() - topHeight - bottomHeight -  2 * $('div.line').outerHeight() - $('#buttonAddNewPeople').outerHeight()-20-$('#buttonAddNewPeople').outerHeight();
        var heightAccord = $('div.accordion').height(hContainerScroll);
//        console.log(heightAccord)



//        $('div.btn-wrap').css("top", $('#projects').outerHeight()+topHeight)
        $('div.list').height($('div.accordion').height() - $('div.line').outerHeight() - $('#buttonAddNewPeople').outerHeight())

        /*set height of ul*/

       var headsProj = $('#accordion-projects .accordion-heading');
        var headsPeop = $('#accordion-people .accordion-heading');
//        countHeight(headsProj);
//        countHeight(headsPeop);

$('#accordion-projects ul.list').height($('div.accordion').height()-$(headsProj[0]).outerHeight()*headsProj.length-28);
        $('#accordion-people ul.list').height($('div.accordion').height()-$(headsPeop[0]).outerHeight()*headsPeop.length-28);
//        function countHeight(obj){
//            ($(obj[0]).outerHeight()*obj.length
//
//
//        }
    }

    function setAccordItems(type, obj, item) {

        if (type == "projects") {
//            console.log(accordProjects);
            accordProjects.addItem(obj, item);
        }
        if (type == "people") {
//            console.log(accordPeople);
            for (var stat in userStatuses) {
                if (userStatuses[stat]._id == obj.status)
                    var item = userStatuses[stat].name;
            }
            accordPeople.addItem(obj, item);
        }
    }

    return setAccordItems
})


