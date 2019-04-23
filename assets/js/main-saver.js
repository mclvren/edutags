import { saveAs } from 'file-saver';
FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBOM: true })
$("#save-btn").click(function() {
  var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(file);
});
