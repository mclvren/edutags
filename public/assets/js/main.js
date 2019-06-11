// import modules
import * as load from './modules/load.js';
import './modules/getZIP.js';
import saveDB from './modules/saveDB.js';
//Скрытие форм при открытии страницы
//callback для ожидания загрузки
function call(code){
  function call2(code) {
    eval(code);
  }
  saveDB(call2);
}
$("#svedenia").addClass("d-none");
$("#struktura").addClass("d-none");
$("#documenty").addClass("d-none");
$("#founders").addClass("d-none");
// Обработчики кнопок на главной странице
$("#sveden-btn").click(function() {
  $("#info-module").load("modules/info.html");
  call($("#svedenia").toggleClass("d-none"));
  load.info(call);
});
$("#struk-btn").click(function() {
  $("#structure-module").load("modules/structure.html");
  call($("#struktura").toggleClass("d-none"));
  load.struc(call);
});
$("#doc-btn").click(function() {
  $("#docs-module").load("modules/docs.html");
  call($("#documenty").toggleClass("d-none"));
  load.docs(call);
});
