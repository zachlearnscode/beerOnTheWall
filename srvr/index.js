const express = require('express')
const app = express()
const port = 80

const Datastore = require('nedb-promises')
let datashop = Datastore.create('datastore')

app.get('/test', async(req, res) => {
  var test = {
    foo: 1,
    bar: 'whatever'
  };
  await datashop.insert(test)
  res.send('Hello World!');
})

app.get('/database', async(req, res) => {
  await datashop.find({})
        .then((docs) => {
          res.send(docs)
        })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})