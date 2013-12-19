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

        node = $(obj.domNode);

        var replaceNode = $(node).find('[data-point="name"]')[0];

    /**
     * here we checks if changes to the node with name were made
     * and if they were - simply rewind them
     * to make innerHTML default
     */
        if(obj['baseNode']) {
            replaceNode.innerHTML = obj['baseNode']
            innerHTML = replaceNode.innerHTML;
        }
        else {
            innerHTML = replaceNode.innerHTML;
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
            innerHTML = innerHTML.substring(0,index) +
                        "<span class='highlight'>" +
                        innerHTML.substring(index,index+text.length) +
                        "</span>" +
                        innerHTML.substring(index + text.length);

            replaceNode.innerHTML = innerHTML
            if(text) {
                rotate(node,2,rotate)
            }
        }
    }

    /**
     * Rotate function
     * if callback was provided works as a shake function
     *
     * @param ell - node to shake
     * @param deg - degree to rotate node
     * @param cb - callback, to provide shake effect, pass rotate function here
     */
    function rotate(/*node*/ell,/*number*/deg,/*callback*/cb){
        $(ell).animate(
            {
                rotation: deg
            },
            {
                duration: 40,
                step: function(now, animFunc) {
                    if (animFunc.prop === "rotation") {
                        $(this).css('-webkit-transform','rotate('+now+'deg)');
                        $(this).css('-moz-transform','rotate('+now+'deg)');
                        $(this).css('transform','rotate('+now+'deg)');
                    }
                },
                complete: function(){
                    if(cb) {
                        var newDeg = -deg;
                        cb(ell,newDeg)
                    } else {
                        $(this).css('-webkit-transform','rotate(0deg)');
                        $(this).css('-moz-transform','rotate(0deg)');
                        $(this).css('transform','rotate(0deg)');
                    }
                }
            }
        )
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


                    if(!reg.test(searchName) && !obj.inProject) {
                        node.fadeOut(500);
                    } else {
                        node.fadeIn(500);
                        highlightText(searchQuery, obj);

                    }
                }

            })
        };

        searchLogic();

    }
    return initSearch
});