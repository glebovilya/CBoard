/**
 * Created by stepanjuk on 28.11.13.
 */
require(['employee'], function(Employee){

    $(".liTEST").



    var divWindow =document.createElement("div");
    document.body.appendChild(divWindow);
    divWindow.style.zIndex = 99999;
    divWindow.style.position = "absolute"
    divWindow.style.top = "100px";
    divWindow.style.left = "500px";

    var empl = new Employee({name:"Vasya", surname:"Pupkin",photo:"path",history:"jjj"});


    $(divWindow).append(empl.template);
console.log(empl);
    return empl;
});