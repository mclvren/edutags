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
  // POST /posts
    app.post('/saveInfo', urlencodedParser, (req, res) => {
      db.get('obr')
        .push(req.body)
        .last()
        .write()
        .then(post => res.send(post))
    })

    // Set db default values
    return db.defaults({ obr: [] }).write()
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'))
  })
