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
var $inputs = $('#osn-sveden :input');
// get an associative array of just the values.
var ms = {};
$inputs.each(function() { //
    ms[this.name] = $(this).val(); // доделать
    if (json.obr_dat=='') { //
      $(this).value(json.obr_dat); //
    }
});
});
//Сохранение основных сведений
$("#osn-sveden").submit(function() {
    // get all the inputs into an array.
    var $inputs = $('#osn-sveden :input');
    // get an associative array of just the values.
    var ms = {};
    var isNull=false;
    $inputs.each(function() {
        ms[this.name] = $(this).val();
        if ($(this).val()=='') {
          isNull=true;
          $(this).addClass("is-invalid text-danger");
          $(this).attr("placeholder", "Поле не заполнено!");
          //$(this).focus();
        }
    });
    $('#osn-sveden :input').focus(function(event) {
     $(this).removeClass("is-invalid text-danger");
     $(this).attr("placeholder", "");
    });
    if (isNull==false) {
      sendAjaxForm('result_form', 'osn-sveden', '/saveInfo');
			return false;
}
return false;
});
