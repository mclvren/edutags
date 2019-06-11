export default function saveDB(callback) {
  //Функция отправки
  function sendAjaxForm(result_form, ajax_form, url) {
    jQuery.ajax({
      url: url, //url страницы (action_ajax_form.php)
      type: "POST", //метод отправки
      dataType: "html", //формат данных
      data: jQuery("#" + ajax_form).serialize(), // Сеарилизуем объект
      success: function(response) {
        //Данные отправлены успешно
        console.log(jQuery.parseJSON(response) + "\n");
        alert("Сохранено");
      },
      error: function(response) {
        // Данные не отправлены
        alert("Ошибка!");
      }
    });
  }
  //
  $(document).ready(function() {
    //Global
    var isNull = false;
    // Функция проверки полей на заполненность
    function check_input(inputs) {
      var ms = {};
      inputs.each(function() {
        if ((this.name != "") && (this.type != 'checkbox') && (this.type != 'button')) ms[this.name] = $(this).val();
        else console.log(this.tagName + " " + this.name + " is skiped from checking\n");
        if (ms[this.name] == "") {
          console.log(this.name + " is null\n");
          isNull = true;
          $(this).addClass("is-invalid text-danger");
          $(this).attr("placeholder", "Поле не заполнено!");
          $("html,body").animate({
            scrollTop: $(this).offset().top
          }, 250);
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
        var $inputs = $("#osn-sveden :input");
        check_input($inputs);
        not_danger($inputs);
        if (isNull == false) {
          sendAjaxForm("result_form", "osn-sveden", "/saveInfo");
          return false;
        }
      }
      e.preventDefault();
      return false;
    });
    //Сохранение Структуры
    $("#structure-form").submit(function() {
      result = confirm("Данные будут перезаписаны!");
      if (result) {
        var $inputs = $("#structure-form :input");
        check_input($inputs);
        not_danger($inputs);
        if (isNull == false) {
          sendAjaxForm("result_form", "structure-form", "/saveStructure");
          return false;
        } else {
          result = confirm("Обнаружено пустое поле, подвердить запись?");
          if (result) sendAjaxForm("result_form", "structure-form", "/saveStructure");
        }
      }
      e.preventDefault(); 
      return false;
    });
  });
  callback();
}
