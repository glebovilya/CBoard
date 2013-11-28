/**
 * Created by stepanjuk on 27.11.13.
 */
$(".employee-body").popover({trigger:"hover", content: $("<img src='../img/border-img2.png' />")});
//var divPeople = $("#people");
//$("#people .list-item").({trigger:"click",placement:"top", content: "888888888888999999999999999999hjiiiiiiiii"});
$("#people .list-item").hover(function(event){
    console.log(event.target);
    console.log(event.target.attr("href"));
});