define(['Accordion', '../thirdParty/bootstrap'], function (Accordion) {

//    var peopleName = {manager: [
//        {id: '0', name: 'People0'},
//        {id: '1', name: 'People1'},
//        {id: '2', name: 'People2'}
//    ],
//        employee: [
//            {id: '0', name: 'Emp0'},
//            {id: '1', name: 'Emp1'},
//            {id: '2', name: 'Emp2'},
//            {id: '3', name: 'Emp3'}
//        ],
//        lead: [
//            {id: '0', name: 'Lead0'},
//            {id: '1', name: 'Lead1'},
//            {id: '2', name: 'Lead2'},
//            {id: '3', name: 'Lead3'},
//            {id: '4', name: 'Lead4'}
//        ]};

//    var projects = {open: [
//        {id: '0', name: 'Project0'},
//        {id: '1', name: 'Project1'},
//        {id: '2', name: 'Project2'},
//        {id: '3', name: 'Project3'},
//        {id: '4', name: 'Project4'},
//        {id: '5', name: 'Project5'}
//    ],
//        closed: [
//            {id: '0', name: 'ClosedProject0'},
//            {id: '1', name: 'ClosedProject1'},
//            {id: '2', name: 'ClosedProject2'}
//        ]};

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
        new Accordion(project, "#accordion-projects");

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
        console.log(dataPerson)
        new Accordion(people, "#accordion-people");
    })

    $(window).bind("resize", function () { //при изменении размера окна вызываем функцию
//         divResize('#right', 150, 100);
//           console.log('xdftbrty')
    });

    function divResize() {
    }
})


