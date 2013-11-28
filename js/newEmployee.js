/**
 * Created by stepanjuk on 28.11.13.
 */
require(['employee'], function(Employee){




    $(".liTEST").click(function(event){
        console.log(event.target);
        var dom = event.target;

        console.log($(dom).attr("data-point-id"));



              $.post(
                  "/get",
                  {
                      id: $(dom).attr("data-point-id")
                  },
                  onAjaxSuccess
              );

              function onAjaxSuccess(data)
              {
                  // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
                  console.log(data.data.surname);

                  var divWindow =document.createElement("div");
                  document.body.appendChild(divWindow);
                  divWindow.style.zIndex = 99999;
                  divWindow.style.position = "absolute";
                  divWindow.style.top = "100px";
                  divWindow.style.left = "500px";


var template = ' <div class = "employee">\
        <div class="employeeWindow ">\
            <div class="employee-header" >\
                <div >position</div>\
                <button type="button" class="close" data-toggle="tooltip" title="remove from project" data-dismiss="modal" aria-hidden="true" >&times;</button>\
            </div>\
            <div class="employee-body">\
                <div class="united" >\
                    <img src="http://placehold.it/90x120" alt="">\
                        <div class= "name" >'+data.data.surname +''+data.data.surname +'</div>\
                    </div>\
                </div>\
                <div class="employee-footer">\
                </div>\
            </div>\
        </div>\
    '

                  var empl = new Employee({
                                name:"Vasya",
                                surname:"Pupkin",
                                photo:"path",
                                history:"jjj"
                  });

                  empl.template = template;
                  $(divWindow).append(empl.template);

                  return empl;



              }
     });




});