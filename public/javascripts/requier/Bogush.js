define(['../requier/Accordion', '../thirdParty/bootstrap', '../requier/resize', '../requier/scroll' ], function (Accordion, boot) {

    var peopleName = {manager: [
        {id: '0', name: 'People0'},
        {id: '1', name: 'People1'},
        {id: '2', name: 'People1'},
        {id: '3', name: 'People1'},
        {id: '4', name: 'People1'},
        {id: '5', name: 'People1'},
        {id: '6', name: 'People1'},
        {id: '7', name: 'People1'},
        {id: '8', name: 'People1'},
        {id: '9', name: 'People2'},
        {id: '10', name: 'People2'},
        {id: '11', name: 'People2'},
        {id: '12', name: 'People2'}
    ],
        employee: [
            {id: '0', name: 'Emp0'},
            {id: '1', name: 'Emp1'},
            {id: '2', name: 'Emp2'},
            {id: '3', name: 'Emp2'},
            {id: '4', name: 'Emp2'},
            {id: '5', name: 'Emp2'},
            {id: '6', name: 'Emp2'},
            {id: '7', name: 'Emp2'},
            {id: '8', name: 'Emp2'},
            {id: '9', name: 'Emp2'},
            {id: '10', name: 'Emp2'},
            {id: '11', name: 'Emp2'},
            {id: '12', name: 'Emp2'},
            {id: '13', name: 'Emp2'},
            {id: '14', name: 'Emp3'}
        ],
        lead: [
            {id: '0', name: 'Lead0'},
            {id: '1', name: 'Lead1'},
            {id: '2', name: 'Lead2'},
            {id: '3', name: 'Lead3'},
            {id: '4', name: 'Lead3'},
            {id: '5', name: 'Lead3'},
            {id: '6', name: 'Lead3'},
            {id: '7', name: 'Lead3'},
            {id: '8', name: 'Lead3'},
            {id: '9', name: 'Lead3'},
            {id: '10', name: 'Lead3'},
            {id: '11', name: 'Lead3'},
            {id: '12', name: 'Lead4'}
        ]};

    var projects = {open: [
        {id: '0', name: 'Project0'},
        {id: '1', name: 'Project1'},
        {id: '2', name: 'Project2'},
        {id: '3', name: 'Project3'},
        {id: '4', name: 'Project4'},
        {id: '5', name: 'Project5'},
        {id: '6', name: 'Project5'},
        {id: '7', name: 'Project5'},
        {id: '8', name: 'Project5'},
        {id: '9', name: 'Project5'},
        {id: '10', name: 'Project5'}
    ],
        closed: [
            {id: '0', name: 'ClosedProject0'},
            {id: '1', name: 'ClosedProject1'},
            {id: '2', name: 'ClosedProject2'},
            {id: '3', name: 'ClosedProject2'},
            {id: '4', name: 'ClosedProject2'},
            {id: '5', name: 'ClosedProject2'},
            {id: '6', name: 'ClosedProject2'},
            {id: '7', name: 'ClosedProject2'}
        ]};

    $('div.container-scroll').height(250);
    /*generate accordion "projects"*/
    var dp;
//    new Accordion(projects, "#accordion-projects");
    $.ajax({
        type: "GET",
        url: "/projects",
        async: false,
        success: function(dataProject) {

            dp = dataProject;
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
        new Accordion(project, "#accordion-projects");
        }
    })

//    console.log(dp)
//    new Accordion(peopleName, "#accordion-people");

    /*generate accordion "people"*/

//    var dataPerson =


//    console.log(peopleName)
    $.ajax({
        type: "GET",
        url: "/users",
        async: false,
        success: function(dataPerson) {

        var people = {};
        for (var elems in dataPerson) {
            var itemk = dataPerson[elems].position
            if (itemk in people)
                people[itemk][people[itemk].length] = {id: dataPerson[elems]._id+"", name: dataPerson[elems].name};
            else
                people[itemk] = [
                    {id: dataPerson[elems]._id+"", name: dataPerson[elems].name}
                ];
        }
            new Accordion(people, "#accordion-people");
//            console.log(people)

    }
    });





//    Accordion.setScroll('.container-scroll', '.scroller', '.scroller__bar');

//    console.log(k);
//        , function (dataPersons) {
//        dataPerson = dataPersons
//   var people =  function fr(people){
//       console.log(people)
//        return people;
//    }


//    new Accordion(people, "#accordion-people");
//
//    })
//------------------
//    console.log(dataPerson)



    //---------------------

//    var ht = $('div#board').height()-18;
    $('div#inner-board').height($('div#board').height() - 18);
    $('div#inner-board').width($('div#board').width() - 18);

    $(window).bind("resize", function () { //при изменении размера окна вызываем функцию
        $('div#inner-board').height($('div#board').height() - 18);
        $('div#inner-board').width($('div#board').width() - 18);
        divResize()
    });

    $('div.tab-content').resize(function () {

//     var elem = $(this);
//        var height = $('div[class="span2 wrap"]').css("height");
//        console.log(height);

//        elem.css("height",)
//        console.log('xdftbrty')
        // Update the info div width and height - replace this with your own code
        // to do something useful!
// elem.closest('.container').find('.info').text( this.tagName + ' width: ' + elem.width() + ', height: ' + elem.height() );
    });


    function divResize() {
        var height_tabs = $('div[id="accordion-projects"]').outerHeight(true) ? $('div[id="accordion-projects"]').outerHeight(true) : $('div[id="accordion-people"]').outerHeight(true);
        var height = $('div[class="span2 wrap"]').outerHeight(true) - $('div[class="custom-view"]').outerHeight(true) -
            $('div[id="search"]').outerHeight(true) - height_tabs - $('div[class="row-fluid btn-wrap"]').outerHeight(true) - $('hr').outerHeight(true);
//        $('div.line').height(height);
//        console.log($('div[class="span2 wrap"]').outerHeight(true)-$('div[class="custom-view"]').outerHeight(true))
//        console.log($('div.line').height())


    }


//    $(document).ready(f);


    setScroll('.container-scroll', '.scroller', '.scroller__bar');

    $(document).ready(function () {
//        console.log('fgh');

//        $('div.container-scroll-people').height(250);
//        $("div#people").click()
//    $('div#people').addClass("active")

//    $('div#people').removeClass('active')
//    $('div#projects').addClass('active')
//        $("div#projects").click()


//        setScroll('.container-scroll-people', '.scroller-people', '.scroller__bar-people');

//        setScroll('.container-scroll-people', '.scroller-people', '.scroller__bar-people');
//        $('div#projects').addClass('active')
//        $('button[href="#people"]').bind("click", function () {
//        console.log('dfh')

//        setScroll('.container-scroll-people', '.scroller-people', '.scroller__bar-people');
//
//        })
//console.log($('.container-scroll-people .header__title'))

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

})


