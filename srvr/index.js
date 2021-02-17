const express = require('express')
const cors = require("cors")
const app = express()
const port = 80

app.use(cors())
app.use(express.json())

const Datastore = require('nedb-promises')
let datashop = Datastore.create('datastore')

app.get('/database', async(req, res) => {
  await datashop.find({})
    .then((docs) => {
      res.send(docs)
    });
})

// retrieve the beers that have been drank
app.get("/beer", async(req, res) => {
  await datashop.findOne({wall: 1})
    .then(async doc => {
      if (!doc) {
        doc = {
          wall: 1,
          beers: new Array(99).fill({})
        };

        await datashop.insert(doc);
      }

      return doc;
    })
    .then(doc => {
      res.send(doc);
    });
});

// save a drank beer
app.post("/beer", async(req, res) => {
  let wall = await datashop.findOne({wall: 1})

  wall.beers[req.body.index] = {
    name: req.body.name,
    beerName: req.body.beerName,
    date: new Date().getTime()
  };

  await datashop.update({wall: 1}, wall);

  res.send(wall);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
