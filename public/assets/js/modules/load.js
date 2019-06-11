//Выгрузка основных сведений из БД
export function info(callback) {
  //Загрузка данных в сведения из БД
  $.getJSON("/load", {}, function(json) {
    // загрузка JSON данных из БД
    // заполняем DOM элемент данными из JSON объекта
    // поля в массив.
    var $inputs = $("#osn-sveden :input");
    // преобразуем JSON в массив
    var json_data = JSON.parse(JSON.stringify(json));
    // выводим данные
    $inputs.each(function() {
      var input_name = [this.name];
      $(this).val(json_data[input_name]);
    });
  });
  callback();
}
//Выгрузка структуры из БД
export function struc(callback) {
  //Загрузка данных в сведения из БД (доделать)
  $.getJSON("/loadStructure", {}, function(json) {
    // загрузка JSON данных из БД
    // заполняем DOM элемент данными из JSON объекта
    // поля в массив.
    var $inputs = $("#structure-form :input");
    // преобразуем JSON в массив
    var json_data = JSON.parse(JSON.stringify(json));
    // выводим данные
    $inputs.each(function() {
      var input_name = [this.name];
      $(this).val(json_data[input_name]);
    });
    //Очищаем пустые строки
    $(document).ready(function() {
      $('#structure-form table textarea').each(function(){
            var text22 = $(this).val();
            if (text22=='') {$(this).closest('tr').remove();}
      });
    });
  });
  callback();
}
