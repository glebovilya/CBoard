require.config({
    baseUrl: "/javascripts/requier"
});

requirejs(
    ['SearchForAccordion',
    'ShowHideAllOnBoard',
    'SearchForInnerBoard',
    'initAccordionOnPage',
    '../thirdParty/bootstrap-datepicker',
    'Modal',
    'Confirm'],

    function( searchAcc, showHide, searchIB){
        searchIB();
        searchAcc();
        showHide.init();

    }
);



