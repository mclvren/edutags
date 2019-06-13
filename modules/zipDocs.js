// Структура (скачать)
const far_js = require('./far.js');
//Функция поиска и замены
findAndReplace = far_js.findAndReplace;
module.exports.func = function(app, db, fs, h, path, zip, others_n, kaf_n, stud_n, pub_n) {
  app.get("/saveDocs_zip", function(req, res) {
    var html = fs.readFileSync(__dirname+"/templates/docs/docs.html", {
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
      //Адреса
      findAndReplace(json, "*struc_address*", values.controls_0_name);
      //Иные
      for (var i = 0; i < others_n; i++) {
        n = i + 1;
        findAndReplace(json, "*others_name_" + n + "*", eval("values.departments_others_" + i + "_name"));
        findAndReplace(json, "*others_fio_" + n + "*", eval("values.departments_others_" + i + "_fio"));
        findAndReplace(json, "*others_post_" + n + "*", eval("values.departments_others_" + i + "_post"));
        findAndReplace(json, "*others_address_" + n + "*", eval("values.departments_others_" + i + "_address_str"));
        findAndReplace(json, "*others_site_" + n + "*", eval("values.departments_others_" + i + "_site"));
        findAndReplace(json, "*others_email_" + n + "*", eval("values.departments_others_" + i + "_email"));
        findAndReplace(json, "*others_doc_link_" + n + "*", eval("values.departments_others_" + i + "_division_clause_doc_link"));
        findAndReplace(json, "*others_phone_" + n + "*", eval("values.departments_others_" + i + "_phone"));
      }
      //Кафедры
      for (var i = 0; i < kaf_n; i++) {
        n = i + 1;
        findAndReplace(json, "*kaf_name_" + n + "*", eval("values.departments_" + i + "_name"));
        findAndReplace(json, "*kaf_fio_" + n + "*", eval("values.departments_" + i + "_fio"));
        findAndReplace(json, "*kaf_post_" + n + "*", eval("values.departments_" + i + "_post"));
        findAndReplace(json, "*kaf_address_" + n + "*", eval("values.departments_" + i + "_address_str"));
        findAndReplace(json, "*kaf_site_" + n + "*", eval("values.departments_" + i + "_site"));
        findAndReplace(json, "*kaf_email_" + n + "*", eval("values.departments_" + i + "_email"));
        findAndReplace(json, "*kaf_doc_link_" + n + "*", eval("values.departments_" + i + "_division_clause_doc_link"));
      }
      //Студенческие органы управления, объединения, организации
      for (var i = 0; i < stud_n; i++) {
        n = i + 1;
        findAndReplace(json, "*stud_name_" + n + "*", eval("values.departments_st_" + i + "_name"));
        findAndReplace(json, "*stud_fio_" + n + "*", eval("values.departments_st_" + i + "_fio"));
        findAndReplace(json, "*stud_post_" + n + "*", eval("values.departments_st_" + i + "_post"));
        findAndReplace(json, "*stud_address_" + n + "*", eval("values.departments_st_" + i + "_address_str"));
        findAndReplace(json, "*stud_site_" + n + "*", eval("values.departments_st_" + i + "_site"));
        findAndReplace(json, "*stud_email_" + n + "*", eval("values.departments_st_" + i + "_email"));
        findAndReplace(json, "*stud_doc_link_" + n + "*", eval("values.departments_st_" + i + "_division_clause_doc_link"));
      }
      //Общественные организации
      for (var i = 0; i < pub_n; i++) {
        n = i + 1;
        findAndReplace(json, "*pub_name_" + n + "*", eval("values.departments_public_" + i + "_name"));
        findAndReplace(json, "*pub_fio_" + n + "*", eval("values.departments_public_" + i + "_fio"));
        findAndReplace(json, "*pub_post_" + n + "*", eval("values.departments_public_" + i + "_post"));
        findAndReplace(json, "*pub_address_" + n + "*", eval("values.departments_public_" + i + "_address_str"));
        findAndReplace(json, "*pub_site_" + n + "*", eval("values.departments_public_" + i + "_site"));
        findAndReplace(json, "*pub_email_" + n + "*", eval("values.departments_public_" + i + "_email"));
        findAndReplace(json, "*pub_doc_link_" + n + "*", eval("values.departments_public_" + i + "_division_clause_doc_link"));
      }
      return json;
    }
    struct = h.stringify(FAR(json));
    res
      .zip({
        files: [{
            content: struct,
            name: "/struct/index.php",
            mode: 0755,
            comment: "structure",
            date: new Date(),
            type: "file"
          },
          {
            path: path.join(__dirname, "/templates/struct/css"),
            name: "/struct/css"
          },
          {
            path: path.join(__dirname, "/templates/struct/fonts"),
            name: "/struct/fonts"
          },
          {
            path: path.join(__dirname, "/templates/struct/js"),
            name: "/struct/js"
          }
        ],
        filename: "structure.zip"
      })
      .catch(function(err) {
        res.send(err); //if zip failed
      });
    console.log("structure.zip сгенерирован и отправлен");
  });
}
