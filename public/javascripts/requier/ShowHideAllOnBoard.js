define(['./Classes/Project', 'StorageForObjectsOnBoard'], function(Project, storage){

    var strg = storage.storage;

    var showHide = {
        clearBoard: function() {
            var innerNodes = $('#inner-board').find('*');
            $.each(innerNodes, function(idx, node) {
                $(node).remove()
            })
            storage.clearStorage()
        },
        /**
         * sends req to server and calls func to render projects
         */
        getProjects: function(){
            $.ajax({
                url: '/projects',
                method: 'GET',
                success: function(projects){showHide.renderProjects(projects)}
            })
        },

        /**
         * calls Project constructor for every elem in array
         * @param projects
         */
        renderProjects: function(/*array of objs*/projects){
            for (var i in projects) {
                if(!projects[i].end){
                    var proj = new Project(projects[i]['_id']);
                    proj.toggleDevs()
                }
            }
        },

        /**
         * adds handlers to buttons to display/hide projects
         */
        init: function(){
            var cleared = true;
            $('#showAll').click(function(){
                if(cleared){
                    showHide.clearBoard();
                    showHide.getProjects();
                    cleared = false
                }
            });
            $('#hideAll').click(function(){
                strg.splice(0, strg.length);
                showHide.clearBoard();
                cleared = true
            })
        }
    }

    return showHide
})
