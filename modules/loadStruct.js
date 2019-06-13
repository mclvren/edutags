// (GET) Получение значений структуры из БД
module.exports.func = function(app,db) {
  app.get("/loadStructure", (req, res) => {
    const resp1 = db
      .get("structure")
      .find({
        id: 1
      })
      .value();
    res.send(resp1);
    console.log("Structure loaded via AJAX");
  });
}
