// (POST) Сохранение структуры
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports.func = function(app,db) {
  app.post("/saveDocs", urlencodedParser, (req, res) => {
    db
      .get("docs")
      .find({
        id: 1
      })
      .assign(req.body)
      .write()
      .then(post => res.send(JSON.stringify("Docs saved to DB")));
    console.log("Docs saved via AJAX");
  });
}
