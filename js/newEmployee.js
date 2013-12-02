/**
 * Created by stepanjuk on 28.11.13.
 */
require(['employee','jquery.event.drag-2.2','jquery.event.drop-2.2' ], function(Employee){




    $(".liTEST").click(function(event){
        console.log(event.target);
        var dom = event.target;
//        data-point-id="45" так должно быть на кнопках
        var id = $(dom).attr("data-point-id");
        console.log($(dom).attr("data-point-id"));



              $.get(
                  "/get",
                  {
                      target:'person',
                       id:id
                  },
                  onAjaxSuccess
              );

              function onAjaxSuccess(data)
              {
                  // Здесь мы получаем данные, отправленные сервером in Object{data:{Object}}.
                  console.log(data);

                  var divWindow =document.createElement("div");
                  document.body.appendChild(divWindow);
                  divWindow.style.zIndex = 99999;
                  divWindow.style.position = "absolute";
                  divWindow.style.top = "100px";
                  divWindow.style.left = "500px";
                  id = "person"+id;
                  divWindow.id = id;

                  var empl = new Employee({
                      domNode: $("#" + id),
                      photo: data.photo,
                      name: data.name,
                      surname: data.surname
                   });

var template = ' <div class = "employee">\
        <div class="employeeWindow ">\
            <div class="employee-header" >\
                <div >position</div>\
                <button type="button" class="close" data-toggle="tooltip" title="remove from project"  aria-hidden="true" >&times;</button>\
            </div>\
            <div class="employee-body">\
                <div class="united" >\
                    <img src=' + empl.photo + ' alt="">\
                        <div class= "name" >'+empl.name +'</br>'+empl.surname +'</div>\
                    </div>\
                </div>\
                <div class="employee-footer">\
                </div>\
            </div>\
        </div>\
    '


                  if(!empl.photo) empl.photo = "/img/images.jpg";

                  empl.template = template;
                  $(divWindow).append(empl.template);

                  $(empl.domNode).find("button").on('click', function(event){
                      $(empl.domNode).remove();
                  });
                  jQuery(function($){
                      $(empl.domNode).drag(function( ev, dd ){
                          $( this ).css({
                              top: dd.offsetY,
                              left: dd.offsetX
                          });
                      });
                  });


                  return empl;



              }
     });




});