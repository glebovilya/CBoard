define(['Accordion', 'bootstrap', 'resize', 'scrolling','jScrollPane', 'scroll' ], function (Accordion, boot, resize, Scrolling,k) {

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

    /*generate accordion "projects"*/
    $.get('/get', {target: 'project', method: 'all'}, function (dataProject) {
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
        new Accordion(projects, "#accordion-projects");

//        $(function()
//        {
////            console.log(jScrollPane)
////            $('.scroll-pane').jScrollPane({showArrows:false, scrollbarWidth:3, dragMaxHeight:43});
//        });
//        anotherf();
//        f();

    })

    /*generate accordion "people"*/
    $.get('/get', {target: 'person', method: 'all'}, function (dataPerson) {
        var people = {};
        for (var elems in dataPerson) {
            var itemk = dataPerson[elems].position
            if (itemk in people)
                people[itemk][people[itemk].length] = {id: dataPerson[elems]._id, name: dataPerson[elems].name};
            else
                people[itemk] = [
                    {id: dataPerson[elems]._id, name: dataPerson[elems].name}
                ];
        }
        new Accordion(peopleName, "#accordion-people");
    })

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

    function anotherf(){

            window.dima = baron({
                root: '.wrapper_scroll',
                scroller: '.scroller',
                bar: '.scroller__bar',
                barOnCls: 'baron'
            }).fix({
                    elements: '.header__title',
                    outside: 'header__title_state_fixed',
                    before: 'header__title_position_top',
                    after: 'header__title_position_bottom'
                }).pull({
                    block: '.load',
                    elements: [{
                        self: '.load__value',
                        property: 'width'
                    }],
                    limit: 115,
                    onExpand: function() {
                        $('.load').css('background', 'red');
                    }
                });
    }

//    function f() {
//        scrolling = new Scrolling();
//        scrolling.initScreen();
//        scrolling.initScrollbar();
//        scrolling.scroll();
//        if ($('ul.screen').bind) $('ul.screen').bind('DOMMouseScroll', function (event) {
//            scrolling.wheel(event);
//        }, false);
//        $('ul.screen').bind("mousewheel", /*=*/ /*document.onmousewheel =*/ function (event) {
//            scrolling.wheel(event);
//        });
//        $('ul.screen').bind("mousemove", function (event) {
//            scrolling.setScrollbarCursor(event);
//        })
//        $('ul.screen').bind("resize",  function () {
//            scrolling.scroll();
//        })
//
//    }
//    $('div.container-scroll').css("height",250);
    $('div.container-scroll').height(250);
    console.log($('div.container-scroll'))

    window.dima = baron({
        root: '.container-scroll',
        scroller: '.scroller',
        bar: '.scroller__bar',
        barOnCls: 'baron'
    }).fix({
            elements: '.header__title',
            outside: 'header__title_state_fixed',
            before: 'header__title_position_top',
            after: 'header__title_position_bottom',
            clickable: true
        }).pull({
            block: '.load',
            elements: [{
                self: '.load__value',
                property: 'width'
            }],
            limit: 115,
            onExpand: function() {
                $('.load').css('background', 'red');
            }
        });
})


