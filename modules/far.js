//Функция поиска и замены
module.exports.findAndReplace = function (object, value, replacevalue) {
  for (var x in object) {
    if (object.hasOwnProperty(x)) {
      if (typeof object[x] == "object") {
        findAndReplace(object[x], value, replacevalue);
      }
      if (object[x] == value) {
        object["content"] = replacevalue;
        object["value"] = replacevalue;
        console.log(value+" -> "+replacevalue);
        //break; // uncomment to stop after first replacement
      }
    }
  }
}
