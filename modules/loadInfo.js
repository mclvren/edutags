// (GET) Получение значений информации из БД
module.exports.func = function(app,db) {
  app.get("/load", (req, res) => {
    const resp1 = db
      .get("info")
      .find({
        id: 1
      })
      .value();
    res.send(resp1);
    console.log("Info loaded via AJAX");
  });
}
