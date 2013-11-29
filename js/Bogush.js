define(['generateAccordion', 'bootstrap'], function (Accordion) {

    var peopleName = {manager: [
        {id: '0', name: 'People0'},
        {id: '1', name: 'People1'},
        {id: '2', name: 'People2'}
    ],
        employee: [
            {id: '0', name: 'Emp0'},
            {id: '1', name: 'Emp1'},
            {id: '2', name: 'Emp2'},
            {id: '3', name: 'Emp3'}
        ],
        lead: [
            {id: '0', name: 'Lead0'},
            {id: '1', name: 'Lead1'},
            {id: '2', name: 'Lead2'},
            {id: '3', name: 'Lead3'},
            {id: '4', name: 'Lead4'}
        ]};

    var projects = {open: [
        {id: '0', name: 'Project0'},
        {id: '1', name: 'Project1'},
        {id: '2', name: 'Project2'},
        {id: '3', name: 'Project3'},
        {id: '4', name: 'Project4'},
        {id: '5', name: 'Project5'}
    ],
        closed: [
            {id: '0', name: 'ClosedProject0'},
            {id: '1', name: 'ClosedProject1'},
            {id: '2', name: 'ClosedProject2'}
        ]};

//    $.get('/get', function(ell){
//        console.log(ell)

    var n = new Accordion(peopleName,  "#accordion-people");
    var n = new Accordion(projects, "#accordion-projects");})




//})
