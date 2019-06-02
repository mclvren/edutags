var status = "";
var message = "";

$(document).ready(function() {
  if (message) {
    make_alert(status, message);
  }
});

function make_alert(status, message, prependTo) {
  if (!prependTo) {
    prependTo = $(".alert_container");
  }
  var alertClass;
  var alertTitle;
  switch (status) {
    case "error":
      alertClass = "alert-danger";
      alertTitle = "Ошибка!";
      break;
    case "warning":
      alertClass = "alert-warning";
      alertTitle = "Внимание!";
      break;
    case "info":
      alertClass = "alert-info";
      alertTitle = "Сообщение:";
      break;
    case "success":
      alertClass = "alert-success";
      alertTitle = "Сообщение:";
      break;
    default:
      alertClass = "alert-info";
      alertTitle = "Сообщение:";
      break;
  }

  var alertBlock = $(".alert");
  alertBlock.find("#alert_status").html(alertTitle);
  alertBlock.find("#alert_message").html(message);
  alertBlock.addClass(alertClass);
  prependTo.prepend(alertBlock);
}

function make_bootstrap_message(status, message, window_container) {
  var dialog_class;
  var dialog_title;
  switch (status) {
    case "error":
      dialog_class = "error_message";
      dialog_title = "Ошибка";
      break;
    case "warning":
      dialog_class = "warning_message";
      dialog_title = "Внимание";
      break;
    case "info":
      dialog_class = "info_message";
      dialog_title = "Сообщение";
      break;
    case "success":
      dialog_class = "success_message";
      dialog_title = "Сообщение";
      break;
    default:
      dialog_class = "info_message";
      break;
  }

  window_container.addClass(dialog_class);
  window_container.find(".modal-title").html(dialog_title);
  window_container.find(".modal-body p").html(message);
  window_container.modal();
}
