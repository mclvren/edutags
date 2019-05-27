//Gloval
var isNull=false;
//Функция отправки
function sendAjaxForm(result_form, ajax_form, url) {
    jQuery.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: jQuery("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	//result = jQuery.parseJSON(response);
        	alert("Сохранено");
    	},
    	error: function(response) { // Данные не отправлены
    		alert("Ошибка!");
    	}
 	});
}
//Загрузка данных из БД
$.getJSON('/load', {}, function(json){  // загрузка JSON данных из БД
// заполняем DOM элемент данными из JSON объекта
// поля в массив.
var $inputs = $('#osn-sveden :input');
// преобразуем JSON в массив
json_data = JSON.parse(JSON.stringify(json));
// выводим данные
$inputs.each(function() {
    input_name = [this.name];
    $(this).val(json_data[input_name]);
});
});
// Функция проверки полей на заполненность
function check_input(inputs) {
  var ms = {};
  inputs.each(function() {
      ms[this.name] = $(this).val();
      if ($(this).val()=='') {
        isNull=true;
        $(this).addClass("is-invalid text-danger");
        $(this).attr("placeholder", "Поле не заполнено!");
        $("html,body").animate({scrollTop: $(this).offset().top}, 1000);
      }
  });
}
// Функция возврата фокуса
function not_danger(inputs) {
  inputs.focus(function(event) {
   $(this).removeClass("is-invalid text-danger");
   $(this).attr("placeholder", "");
  });
}
//Сохранение основных сведений
$("#osn-sveden").submit(function() {
    result = confirm("Данные будут перезаписаны!");
    if (result) {
    var $inputs = $('#osn-sveden :input');
    check_input($inputs);
    not_danger($inputs);
    if (isNull==false) {
      sendAjaxForm('result_form', 'osn-sveden', '/saveInfo');
			return false;
}
}
return false;
});
//Скачивание архива
$("#saveInfo_btn").click(function() {
    result = confirm("Изменения сохранены?");
    if (result) window.open("/saveInfo_zip");
    else $("#save-btn").focus();
return false;
});
