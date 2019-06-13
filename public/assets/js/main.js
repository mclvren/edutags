//Скрытие форм при открытии страницы
//callback для ожидания загрузки
function call(code) {
  eval(code);
}
// Загрузка html модулей
$("#info-module").load("modules/info.html");
$("#structure-module").load("modules/structure.html");
$("#docs-module").load("modules/docs.html");
// Обработчики кнопок на главной странице
$(document).ready(function() {
  $("#svedenia").addClass("d-none");
  $("#struktura").addClass("d-none");
  $("#documenty").addClass("d-none");
  $("#founders").addClass("d-none");
  $("#sveden-btn").click(function() {
    call($("#svedenia").toggleClass("d-none"));
    info(call);
  });
  $("#struk-btn").click(function() {
    call($("#struktura").toggleClass("d-none"));
    struc(call);
  });
  $("#doc-btn").click(function() {
    call($("#documenty").toggleClass("d-none"));
    docs(call);
  });
  $("#founders-btn").click(function() {
    $("#osn-sveden #founders").toggleClass("d-none");
  });
});
