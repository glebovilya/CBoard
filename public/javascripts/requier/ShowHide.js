define(['./Classes/Project'], function(Project){
    var showHide = {
        clearBoard: function() {
            var innerNodes = $('#inner-board').find('*')
            $.each(innerNodes, function(idx, node) {
                $(node).remove()
            })
        },
        getProjects: function(){
            $.ajax({
                url: '/projects',
                method: 'GET',
                success: function(projects){showHide.renderProjects(projects)}
            })
        },
        renderProjects: function(/*array of objs*/projects){
            for (var i in projects) {
                var proj = new Project(projects[i])
            }
        },
        init: function(){
            var cleared = true;
            $('#showAll').click(function(){
                if(cleared){
                    showHide.clearBoard();
                    showHide.getProjects();
                    cleared = false
                }
            })
            $('#hideAll').click(function(){
                showHide.clearBoard();
                cleared = true
            })
        }
    }

    return showHide
})
