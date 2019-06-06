const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const zip = require("express-easy-zip");
const path = require("path");
const fs = require("fs");
const h = require("himalaya");
const PORT = process.env.PORT || 5000;
// Create server
const app = express();
app.use(helmet());
app.use(zip());
app.use(bodyParser.json());
app.use("/", express.static("public"));
// Create database instance and start server
const adapter = new FileAsync("db.json");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//Функция поиска и замены
function findAndReplace(object, value, replacevalue) {
  for (var x in object) {
    if (object.hasOwnProperty(x)) {
      if (typeof object[x] == "object") {
        findAndReplace(object[x], value, replacevalue);
      }
      if (object[x] == value) {
        object["content"] = replacevalue;
        object["value"] = replacevalue;
        console.log(value+" replaced with "+replacevalue);
        //break; // uncomment to stop after first replacement
      }
    }
  }
}
//БД
low(adapter)
  .then(db => {
    // POST /Сохранение информации об учреждении
    app.post("/saveInfo", urlencodedParser, (req, res) => {
      db
        .get("info")
        .find({ id: 1 })
        .assign(req.body)
        .write()
        .then(post => res.send(JSON.stringify("Info saved to DB")));
        console.log("Info saved via AJAX");
    });
    // POST /Сохранение структуры
    app.post("/saveStructure", urlencodedParser, (req, res) => {
      db
        .get("structure")
        .find({ id: 1 })
        .assign(req.body)
        .write()
        .then(post => res.send(JSON.stringify("Structure saved to DB")));
        console.log("Structure saved via AJAX");
    });
    // GET /Получение значений информации из БД
    app.get("/load", (req, res) => {
      const resp1 = db
        .get("info")
        .find({ id: 1 })
        .value();
      res.send(resp1);
      console.log("Info loaded via AJAX");
    });
    // GET /Получение значений структуры из БД
    app.get("/loadStructure", (req, res) => {
      const resp1 = db
        .get("structure")
        .find({ id: 1 })
        .value();
      res.send(resp1);
      console.log("Structure loaded via AJAX");
    });
    //Освновные сведения (скачать)
    app.get("/saveInfo_zip", function(req, res) {
      var html = fs.readFileSync("info/common.html", { encoding: "utf8" });
      var json = h.parse(html);
      const values = db
        .get("info")
        .find({ id: 1 })
        .value();
      // Замена полей в шаблоне для common
      function FAR(json) {
        findAndReplace(json, "*organization_name*", values.organization_name);
        findAndReplace(json, "*obr_dat*", values.obr_dat);
        findAndReplace(json, "*obr_adr*", values.obr_adr);
        findAndReplace(json, "*obr_time*", values.obr_time);
        findAndReplace(json, "*obr_phones*", values.obr_phones);
        findAndReplace(json, "*obr_fax*", values.obr_fax);
        findAndReplace(json, "*obr_email*", values.obr_email);
        findAndReplace(json, "*founders_1_name_uchred*", values.founders_1_name_uchred);
        findAndReplace(json, "*founders_1_fullname_uchred*", values.founders_1_fullname_uchred);
        findAndReplace(json, "*founders_1_address_uchred*", values.founders_1_address_uchred);
        findAndReplace(json, "*founders_1_tel_uchred*", values.founders_1_tel_uchred);
        findAndReplace(json, "*founders_1_mail_uchred*", values.founders_1_mail_uchred);
        findAndReplace(json, "*founders_1_website_uchred*", values.founders_1_website_uchred);
        return json;
      }
      common = h.stringify(FAR(json));
      res
        .zip({
          files: [
            {
              content: common,
              name: "index.php",
              mode: 0755,
              comment: "common",
              date: new Date(),
              type: "file"
            },
            { path: path.join(__dirname, "/info/css"), name: "/css" },
            { path: path.join(__dirname, "/info/fonts"), name: "/fonts" },
            { path: path.join(__dirname, "/info/js"), name: "/js" }
          ],
          filename: "common.zip"
        })
        .catch(function(err) {
          res.send(err); //if zip failed
        });
        console.log("Common.zip generated");
    });
    //Структура (скачать)
    app.get("/saveStructure_zip", function(req, res) {
      var html = fs.readFileSync("struct/struct.html", { encoding: "utf8" });
      var json = h.parse(html);
      console.log(json);
      const values = db
        .get("structure")
        .find({ id: 1 })
        .value();
      // Замена полей в шаблоне
      function FAR(json) {
        //Адреса
        findAndReplace(json, "*struc_address*", values.controls_0_name);
        //Иные
        for (var i = 0; i < 14; i++) {
          n=i+1;
          findAndReplace(json, "*others_name_"+n+"*", eval("values.departments_others_"+i+"_name"));
          findAndReplace(json, "*others_fio_"+n+"*", eval("values.departments_others_"+i+"_fio"));
          findAndReplace(json, "*others_post_"+n+"*", eval("values.departments_others_"+i+"_post"));
          findAndReplace(json, "*others_address_"+n+"*", eval("values.departments_others_"+i+"_address_str"));
          findAndReplace(json, "*others_site_"+n+"*", eval("values.departments_others_"+i+"_site"));
          findAndReplace(json, "*others_email_"+n+"*", eval("values.departments_others_"+i+"_email"));
          findAndReplace(json, "*others_doc_link_"+n+"*", eval("values.departments_others_"+i+"_division_clause_doc_link"));
          findAndReplace(json, "*others_phone_"+n+"*", eval("values.departments_others_"+i+"_phone"));
        }
        //Кафедры
        for (var i = 0; i < 6; i++) {
          n=i+1;
          findAndReplace(json, "*kaf_name_"+n+"*", eval("values.departments_"+i+"_name"));
          findAndReplace(json, "*kaf_fio_"+n+"*", eval("values.departments_"+i+"_fio"));
          findAndReplace(json, "*kaf_post_"+n+"*", eval("values.departments_"+i+"_post"));
          findAndReplace(json, "*kaf_address_"+n+"*", eval("values.departments_"+i+"_address_str"));
          findAndReplace(json, "*kaf_site_"+n+"*", eval("values.departments_"+i+"_site"));
          findAndReplace(json, "*kaf_email_"+n+"*", eval("values.departments_"+i+"_email"));
          findAndReplace(json, "*kaf_doc_link_"+n+"*", eval("values.departments_"+i+"_division_clause_doc_link"));
        }
        //Студенческие органы управления, объединения, организации
        for (var i = 0; i < 2; i++) {
          n=i+1;
          findAndReplace(json, "*stud_name_"+n+"*", eval("values.departments_st_"+i+"_name"));
          findAndReplace(json, "*stud_fio_"+n+"*", eval("values.departments_st_"+i+"_fio"));
          findAndReplace(json, "*stud_post_"+n+"*", eval("values.departments_st_"+i+"_post"));
          findAndReplace(json, "*stud_address_"+n+"*", eval("values.departments_st_"+i+"_address_str"));
          findAndReplace(json, "*stud_site_"+n+"*", eval("values.departments_st_"+i+"_site"));
          findAndReplace(json, "*stud_email_"+n+"*", eval("values.departments_st_"+i+"_email"));
          findAndReplace(json, "*stud_doc_link_"+n+"*", eval("values.departments_st_"+i+"_division_clause_doc_link"));
        }
        //Общественные организации
        for (var i = 0; i < 2; i++) {
          n=i+1;
          findAndReplace(json, "*pub_name_"+n+"*", eval("values.departments_public_"+i+"_name"));
          findAndReplace(json, "*pub_fio_"+n+"*", eval("values.departments_public_"+i+"_fio"));
          findAndReplace(json, "*pub_post_"+n+"*", eval("values.departments_public_"+i+"_post"));
          findAndReplace(json, "*pub_address_"+n+"*", eval("values.departments_public_"+i+"_address_str"));
          findAndReplace(json, "*pub_site_"+n+"*", eval("values.departments_public_"+i+"_site"));
          findAndReplace(json, "*pub_email_"+n+"*", eval("values.departments_public_"+i+"_email"));
          findAndReplace(json, "*pub_doc_link_"+n+"*", eval("values.departments_public_"+i+"_division_clause_doc_link"));
        }
        return json;
      }
      common = h.stringify(FAR(json));
      res
        .zip({
          files: [
            {
              content: common,
              name: "index.php",
              mode: 0755,
              comment: "structure",
              date: new Date(),
              type: "file"
            },
            { path: path.join(__dirname, "/struct/css"), name: "/css" },
            { path: path.join(__dirname, "/struct/fonts"), name: "/fonts" },
            { path: path.join(__dirname, "/struct/js"), name: "/js" }
          ],
          filename: "structure.zip"
        })
        .catch(function(err) {
          res.send(err); //if zip failed
        });
        console.log("structure.zip generated");
    });
    // Set db default values
    return db.defaults({ info: [{ id: 1 }], structure: [{ id: 1 }] }).write();
  })
  .then(() => {
    app.listen(PORT, () => console.log("listening on port " + PORT));
    exports.closeServer = function() {
      app.close();
    };
  });
