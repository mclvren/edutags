FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBOM: true })
$("#save-btn").click(function() {
  var FileSaver = require('file-saver');
  var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(file);
});
