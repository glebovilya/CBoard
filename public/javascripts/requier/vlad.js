define(['../thirdParty/jquery.event.drag-2.2', '../thirdParty/jquery.event.drop-2.2'/*, 'jquery.event.drag.live-2.2'*/],
    function () {
        function initSearch () {
            var search = $('#search input');
            var people = $('#accordion-people');
            var projects = $('#accordion-projects');

            var searchLogic = function(accordion) {


                search.keyup(function(){
                    var searchQuery = search.val();
                    accordion.find('li').each(function(ell, node){

                        var name = $(node).text(); //inner text of particular li, represents person name and surname
                        var reg = new RegExp(searchQuery);

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

            search.click(function(){
                search.val('');
                displayDefault(people);
                displayDefault(projects);
            });

            $('#sideSwitcher').click(function(){
                if($('#people').offset().left < 0){
                    search.val('');
                    displayDefault(people);
                    displayDefault(projects);

                } else {
                    search.val('');
                    displayDefault(people);
                    displayDefault(projects);
                }
            });

        }
        return initSearch
    }

)
