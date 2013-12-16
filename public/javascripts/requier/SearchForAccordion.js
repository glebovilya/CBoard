define(function () {
        function initSearch () {
            var searchField = $('#search input');
            var people = $('#accordion-people');
            var projects = $('#accordion-projects');

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

            var displayDefault = function(accordion){
                accordion.find('li').each(function(ell, node){
                    $(node).css('display', 'block')
                })
            };

            searchLogic(people);
            searchLogic(projects);

            searchField.dblclick(function(){
                searchField.val('');
                displayDefault(people);
                displayDefault(projects);
            });

            $('#sideSwitcher').click(function(){
                if($('#people').offset().left < 0){
                    searchField.val('');
                    displayDefault(people);
                    displayDefault(projects);

                } else {
                    searchField.val('');
                    displayDefault(people);
                    displayDefault(projects);
                }
            });

        }
        return initSearch
    }
)
