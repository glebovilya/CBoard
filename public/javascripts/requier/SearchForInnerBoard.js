define(['StorageForObjectsOnBoard'], function(storage){
    /**
     * surround text that was found with span and highlight it wis css
     *
     * @param text
     * @param obj
     */
    function highlightText(/*search string*/text, /*object in storage*/obj){
        var innerHTML;
        var node;

        if(obj.domNode['2']) {
            node = obj.domNode[2]
        } else {
            node = obj.domNode[0]
        }

        var replaceNode = $(node).find('[data-point="name"]')[0];
        innerHTML = replaceNode.innerHTML;


        /**
         * here we checks if changes to the node with name was made
         * and if they were - simply rewind them
         * to make innerHTML default
         */
        if(obj['baseNode']) {
            innerHTML = obj['baseNode']
        }
        else {
            obj['baseNode'] = innerHTML
        }

        var toLCinnerHTML = innerHTML.toLowerCase();
        var toLCtext = text.toLowerCase();

        /**
         * just checking if search query is in our node
         * if it does, simply wrap our peace of text with span
         */

        var index = toLCinnerHTML.indexOf(toLCtext);
        if ( index >= 0)
        {
            innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
            replaceNode.innerHTML = innerHTML

        }
    }


    function initSearch () {
        var searchField = $('#search-inner input');
        /**
         * depending on what obj are in storage object
         * and query were in search input shows or hides .domNode of objects
         */
        var searchLogic = function() {
            searchField.keyup(function(){
                var searchQuery = searchField.val();
                var reg = new RegExp(searchQuery, 'i');

                for(var i in storage.storage) {
                    var obj = storage.storage[i];
                    var node = $(obj.domNode);
                    var searchName = obj.searchName;

                    highlightText(searchQuery, obj);
//                    if(reg.test(searchName) && searchQuery){
//                        node.addClass('shadow')
//                    }
//                    else {
//                        node.removeClass('shadow')
//                    }
                    if(!reg.test(searchName) && !obj.inProject) {
                        node.fadeOut(500);
                    } else {
                        /*node.css({display: 'block'})*/
                        node.fadeIn(500);

                    }
                }

            })
        };

        searchLogic();

    }
    return initSearch
});