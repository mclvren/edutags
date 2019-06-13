// (POST) Сохранение структуры
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports.func = function(app,db) {
  app.post("/saveStructure", urlencodedParser, (req, res) => {
    db
      .get("structure")
      .find({
        id: 1
      })
      .assign(req.body)
      .write()
      .then(post => res.send(JSON.stringify("Structure saved to DB")));
    console.log("Structure saved via AJAX");
  });
}
