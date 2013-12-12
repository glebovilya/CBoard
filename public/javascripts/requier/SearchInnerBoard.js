define(['innerContainer'], function(storage){
    function initSearch () {
        var searchField = $('#search-inner input');

        var searchLogic = function() {
            searchField.keyup(function(){
                var searchQuery = searchField.val();
                var reg = new RegExp(searchQuery, 'i');

                for(var i in storage.storage) {
                    var obj = storage.storage[i];
                    var node = $(obj.domNode);
                    var searchName = obj.searchName;
                    if(!reg.test(searchName) && !obj.inProject) {
                        node.fadeOut(500/*, node.css({display: 'none'})*/);
//                        $(obj.domNode).css({display: 'none'})
                    } else {
                        /*node.css({display: 'block'})*/
                        node.fadeIn(500)
                    }
                }

            })
        };

        searchLogic();

    }
    return initSearch
});