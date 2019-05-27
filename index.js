const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const zip = require('express-easy-zip')
const path = require('path')
const fs = require('fs')
const h = require('himalaya');
// Create server
const app = express()
app.use(helmet())
app.use(zip());
app.use(bodyParser.json())
app.use('/', express.static('public'))
// Create database instance and start server
const adapter = new FileAsync('db.json')
const urlencodedParser = bodyParser.urlencoded({extended: false});
//Функция поиска и замены
function findAndReplace(object, value, replacevalue) {
  for (var x in object) {
    if (object.hasOwnProperty(x)) {
      if (typeof object[x] == 'object') {
        findAndReplace(object[x], value, replacevalue);
      }
      if (object[x] == value) {
        object["content"] = replacevalue;
        // break; // uncomment to stop after first replacement
      }
    }
  }
}
//БД
low(adapter)
  .then(db => {
  // POST /Сохранение информации об образовании
    app.post('/saveInfo', urlencodedParser, (req, res) => {
      db.get('obr')
        .find({id: 1})
        .assign(req.body)
        .write()
        .then(post => res.send(post))
    })
    // GET /Получение значений из БД
    app.get('/load', (req, res) => {
      const resp1 = db.get('obr')
        .find({id: 1})
        .value()
        res.send(resp1)
    })
    //Освновные сведения (скачать)
    app.use('/saveInfo_zip', function(req, res){
      var html = fs.readFileSync('info/common.html', {encoding: 'utf8'});
      var json = h.parse(html);
      const values= db.get('obr').find({id: 1}).value()
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
      common=h.stringify(FAR(json));
      html = fs.readFileSync('info/common-ovz.html', {encoding: 'utf8'})
      json = h.parse(html);
      common_ovz=h.stringify(FAR(json));
      res.zip({
          files: [
              { content: common,
                   name: 'common.html',
                   mode: 0755,
                comment: 'common',
                   date: new Date(),
                   type: 'file' },
              { content: common_ovz,
                   name: 'common-ovz.html',
                   mode: 0755,
                   comment: 'common_ovz',
                   date: new Date(),
                   type: 'file' },
              { path: path.join(__dirname, '/info/'), name: '/' }    //or a folder
          ],
          filename: 'common.zip'
      });
});
    // Set db default values
    return db.defaults({ obr: [{"id":1}] }).write()
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'))
  })
