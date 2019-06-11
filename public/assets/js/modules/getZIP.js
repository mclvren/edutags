//Скачивание архива с сведениями
$("#saveInfo_btn").click(function() {
  var result = confirm("Изменения сохранены?");
  if (result) window.open("/saveInfo_zip");
  else $("#osn-sveden #save-btn").focus();
  return false;
});
//Скачивание архива с структурой
$("#saveStructure_btn").click(function() {
  var result = confirm("Изменения сохранены?");
  if (result) window.open("/saveStructure_zip");
  else $("#structure-form #save-btn").focus();
  return false;
});
