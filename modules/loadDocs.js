// (GET) Получение значений документов из БД
module.exports.func = function(app,db) {
  app.get("/loadDocs", (req, res) => {
    const resp1 = db
      .get("docs")
      .find({
        id: 1
      })
      .value();
    res.send(resp1);
    console.log("Docs loaded via AJAX");
  });
}
