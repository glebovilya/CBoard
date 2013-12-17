define(function () {

        /**
         * Function binds event listener(keyup) on search area
         * and hides or shows elemnts of accordion
         */
        function initSearch () {
            var searchField = $('#search input');
            var peopleAccNode = $('#accordion-people');
            var projectsAccNode = $('#accordion-projects');
            var sideswitcher = $('#sideSwitcher');


            var searchLogic = function(accordion) {
                searchField.keyup(function(){
                    var searchQuery = searchField.val();
                    var reg = new RegExp(searchQuery, 'i');

                    accordion.find('li').each(function(ell, node){

                        var name = $(node).text(); //inner text of particular li, represents person name and surname
                        if(!reg.test(name)) {
                            $(node).css('display', 'none')
                        } else {
                            $(node).css('display', 'block')
                        }

                    })
                })
            };


            /**
             * just return display css attr to block
             * of items in specific accordion
             *
             * @param accordion
             */
            var displayDefault = function(/*nodeElem container for accordion*/accordion){
                accordion.find('li').each(function(ell, node){
                    $(node).css('display', 'block')
                })
            };

            searchLogic(peopleAccNode);
            searchLogic(projectsAccNode);

            searchField.dblclick(function(){
                searchField.val('');
                displayDefault(peopleAccNode);
                displayDefault(projectsAccNode);
            });


            /**
             * this handler needs to reset view
             * of accordions on switching between them
             */
            sideswitcher.click(function(){
                if(peopleAccNode.offset().left < 0){
                    searchField.val('');
                    displayDefault(peopleAccNode);
                    displayDefault(projectsAccNode);

                } else {
                    searchField.val('');
                    displayDefault(peopleAccNode);
                    displayDefault(projectsAccNode);
                }
            });

        }
        return initSearch
    }
)
