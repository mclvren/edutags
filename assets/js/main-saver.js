(function($){
  $.fn.getFormData = function(){
    var data = {};
    var dataArray = $(this).serializeArray();
    for(var i=0;i<dataArray.length;i++){
      data[dataArray[i].name] = dataArray[i].value;
    }
    return data;
  }
})(jQuery);
var mainsource = $("#osn-sveden").getFormData();
$("#save-btn").click(function() {
  var file = new File([mainsource], "test.txt", {type: "text/plain;charset=utf-8"});
  saveAs(file);
});
