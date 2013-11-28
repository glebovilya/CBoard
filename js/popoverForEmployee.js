define(['bootstrap'],
    function() {
        $(".employee-body").popover({
            trigger:"hover",
            content: "project, project, birthday, some information"
        });
        $("#people .list-item").popover({
            trigger:"hover",
            content: "project, project, birthday, some information"
        });
    }
);


