// (POST) Сохранение информации об учреждении
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports.func = function(app,db) {
  app.post("/saveInfo", urlencodedParser, (req, res) => {
    db
      .get("info")
      .find({
        id: 1
      })
      .assign(req.body)
      .write()
      .then(post => res.send(JSON.stringify("Info saved to DB")));
    console.log("Info saved via AJAX");
  });
}
