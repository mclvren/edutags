const express = require("express");
const helmet = require("helmet");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const zip = require("express-easy-zip");
const path = require("path");
const fs = require("fs");
const h = require("himalaya");
const cors = require('cors');
const config = require('./config.js');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const PORT = process.env.PORT || config.port;
// Create server
const app = express();
// for localhost
app.use(cors());
// Authentication module.
const auth = require('http-auth');
//Данные для входа
const set_username = config.username;
const set_password = config.password;
var basic = auth.basic({
		realm: "Simon Area."
	}, (username, password, callback) => {
	    // Custom authentication
	    // Use callback(error) if you want to throw async error.
		callback(username === set_username && password === set_password);
	}
);
app.use(auth.connect(basic));
app.use(helmet());
app.use(zip());
app.use(bodyParser.json());
app.use("/", express.static("public"));
// Create database instance and start server
const adapter = new FileAsync("db.json");
//Подключение модулей
const loadInfo = require('./modules/loadInfo.js');
const loadStruct = require('./modules/loadStruct.js');
const loadDocs = require('./modules/loadDocs.js');
const saveInfo = require('./modules/saveInfo.js');
const saveStruct = require('./modules/saveStruct.js');
const saveDocs = require('./modules/saveDocs.js');
const zipInfo = require('./modules/zipInfo.js');
const zipStruct = require('./modules/zipStruct.js');
//БД
low(adapter)
  .then(db => {
    // Сохранение информации об учреждении
		saveInfo.func(app, db);
    // Сохранение структуры
		saveStruct.func(app, db);
		// Сохранение структуры
		saveDocs.func(app, db);
    // Получение значений информации из БД
		loadInfo.func(app, db);
    // Получение значений структуры из БД
		loadStruct.func(app, db);
		// Получение значений информации из БД
		loadDocs.func(app, db);
    // Основные сведения (скачать)
		zipInfo.func(app, db, fs, h, path, zip);
    // Структура (скачать)
		zipStruct.func(app, db, fs, h, path, zip, config.others_n, config.kaf_n, config.stud_n, config.pub_n);
    // Стандартные значения дла БД
    return db.defaults({ info: [{ id: 1 }], structure: [{ id: 1 }], docs: [{ id: 1 }] }).write();
  })
  .then(() => {
    var server = app.listen(PORT, () => 	console.log("Приложение доступно по адрессу http://" + server.address().address + ":" + server.address().port));
	console.log("Логин: "+set_username+" Пароль: "+set_password);
    exports.closeServer = function() {
      app.close();
    };
  });
