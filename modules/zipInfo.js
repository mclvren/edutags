// Основные сведения (скачать)
const far_js = require('./far.js');
//Функция поиска и замены
findAndReplace = far_js.findAndReplace;
module.exports.func = function(app,db,fs,h, path, zip) {
  app.get("/saveInfo_zip", function(req, res) {
    var html = fs.readFileSync(__dirname+"/info/common.html", {
      encoding: "utf8"
    });
    var json = h.parse(html);
    const values = db
      .get("info")
      .find({
        id: 1
      })
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
        files: [{
            content: common,
            name: "/common/index.php",
            mode: 0755,
            comment: "common",
            date: new Date(),
            type: "file"
          },
          {
            path: path.join(__dirname, "/info/css"),
            name: "/common/css"
          },
          {
            path: path.join(__dirname, "/info/fonts"),
            name: "/common/fonts"
          },
          {
            path: path.join(__dirname, "/info/js"),
            name: "/common/js"
          }
        ],
        filename: "common.zip"
      })
      .catch(function(err) {
        res.send(err); //if zip failed
      });
    console.log("Common.zip generated");
  });
}
