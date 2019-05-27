const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

// Create server
const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use('/', express.static('public'))
// Create database instance and start server
const adapter = new FileAsync('db.json')
const urlencodedParser = bodyParser.urlencoded({extended: false});
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

    // Set db default values
    return db.defaults({ obr: [{"id":1}] }).write()
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'))
  })
