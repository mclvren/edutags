// Структура (скачать)
const far_js = require('./far.js');
//Функция поиска и замены
findAndReplace = far_js.findAndReplace;
module.exports.func = function(app, db, fs, h, path, zip, docs_n) {
  app.get("/saveDocs_zip", function(req, res) {
    var html = fs.readFileSync(__dirname+"/templates/docs/document.html", {
      encoding: "utf8"
    });
    var json = h.parse(html);
    console.log(json);
    const values = db
      .get("docs")
      .find({
        id: 1
      })
      .value();
    // Замена полей в шаблоне
    function FAR(json) {
      //Иные
      for (var i = 0; i < docs_n; i++) {
        n = i + 1;
        findAndReplace(json, "*ustavs_" + n + "_name*", eval("values.ustavs_" + i + "_name"));
        findAndReplace(json, "*ustavs_" + n + "_url*", eval("values.ustavs_" + i + "_url"));
        findAndReplace(json, "*licenses_" + n + "_name*", eval("values.licenses_" + i + "_name"));
        findAndReplace(json, "*licenses_" + n + "_url*", eval("values.licenses_" + i + "_url"));
        findAndReplace(json, "*accreditations_" + n + "_name*", eval("values.accreditations_" + i + "_name"));
        findAndReplace(json, "*accreditations_" + n + "_url*", eval("values.accreditations_" + i + "_url"));
        findAndReplace(json, "*fin_plans_" + n + "_name*", eval("values.fin_plans_" + i + "_name"));
        findAndReplace(json, "*fin_plans_" + n + "_url*", eval("values.fin_plans_" + i + "_url"));
        findAndReplace(json, "*priems_" + n + "_name*", eval("values.priems_" + i + "_name"));
        findAndReplace(json, "*priems_" + n + "_url*", eval("values.priems_" + i + "_url"));
        findAndReplace(json, "*modes_" + n + "_name*", eval("values.modes_" + i + "_name"));
        findAndReplace(json, "*modes_" + n + "_url*", eval("values.modes_" + i + "_url"));
        findAndReplace(json, "*tek_kontrols_" + n + "_name*", eval("values.tek_kontrols_" + i + "_name"));
        findAndReplace(json, "*tek_kontrols_" + n + "_url*", eval("values.tek_kontrols_" + i + "_url"));
        findAndReplace(json, "*perevods_" + n + "_name*", eval("values.perevods_" + i + "_name"));
        findAndReplace(json, "*perevods_" + n + "_url*", eval("values.perevods_" + i + "_url"));
        findAndReplace(json, "*vozes_" + n + "_name*", eval("values.vozes_" + i + "_name"));
        findAndReplace(json, "*vozes_" + n + "_url*", eval("values.vozes_" + i + "_url"));
        findAndReplace(json, "*local_act_studs_" + n + "_name*", eval("values.local_act_studs_" + i + "_name"));
        findAndReplace(json, "*local_act_studs_" + n + "_url*", eval("values.local_act_studs_" + i + "_url"));
        findAndReplace(json, "*local_act_orders_" + n + "_name*", eval("values.local_act_orders_" + i + "_name"));
        findAndReplace(json, "*local_act_orders_" + n + "_url*", eval("values.local_act_orders_" + i + "_url"));
        findAndReplace(json, "*local_act_collecs_" + n + "_name*", eval("values.local_act_collecs_" + i + "_name"));
        findAndReplace(json, "*local_act_collecs_" + n + "_url*", eval("values.local_act_collecs_" + i + "_url"));
        findAndReplace(json, "*report_edus_" + n + "_name*", eval("values.report_edus_" + i + "_name"));
        findAndReplace(json, "*report_edus_" + n + "_url*", eval("values.report_edus_" + i + "_url"));
        findAndReplace(json, "*paid_edus_" + n + "_name*", eval("values.paid_edus_" + i + "_name"));
        findAndReplace(json, "*paid_edus_" + n + "_url*", eval("values.paid_edus_" + i + "_url"));
        findAndReplace(json, "*paid_edu_dogs_" + n + "_name*", eval("values.paid_edu_dogs_" + i + "_name"));
        findAndReplace(json, "*paid_edu_dogs_" + n + "_url*", eval("values.paid_edu_dogs_" + i + "_url"));
        findAndReplace(json, "*paid_edu_stoims_" + n + "_name*", eval("values.paid_edu_stoims_" + i + "_name"));
        findAndReplace(json, "*paid_edu_stoims_" + n + "_url*", eval("values.paid_edu_stoims_" + i + "_url"));
        findAndReplace(json, "*prescriptions_" + n + "_name*", eval("values.prescriptions_" + i + "_name"));
        findAndReplace(json, "*prescriptions_" + n + "_url*", eval("values.prescriptions_" + i + "_url"));
        findAndReplace(json, "*prescription_otchets_" + n + "_name*", eval("values.prescription_otchets_" + i + "_name"));
        findAndReplace(json, "*prescription_otchets_" + n + "_url*", eval("values.prescription_otchets_" + i + "_url"));
      }
      return json;
    }
    document = h.stringify(FAR(json));
    res
      .zip({
        files: [{
            content: document,
            name: "/document/index.php",
            mode: 0755,
            comment: "structure",
            date: new Date(),
            type: "file"
          },
          {
            path: path.join(__dirname, "/templates/docs/css"),
            name: "/document/css"
          },
          {
            path: path.join(__dirname, "/templates/docs/fonts"),
            name: "/document/fonts"
          },
          {
            path: path.join(__dirname, "/templates/docs/js"),
            name: "/document/js"
          }
        ],
        filename: "document.zip"
      })
      .catch(function(err) {
        res.send(err); //if zip failed
      });
    console.log("document.zip сгенерирован и отправлен");
  });
}
