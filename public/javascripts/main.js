require.config({
    baseUrl: "/javascripts/requier"
});






requirejs(
    ['SearchForAccordion',
    'ShowHideAllOnBoard',
    'SearchForInnerBoard',
    'initAccordionOnPage',
    'Classes/Person',
    'Classes/Project',
    '../thirdParty/bootstrap-datepicker',
    'Modal' ],

    function( searchAcc, showHide, searchIB){



    searchIB();
    searchAcc();
    showHide.init();

});



