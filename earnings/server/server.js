const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const redis = require('redis');
const client = redis.createClient();

const app = express();
const port = process.env.PORT || 8080;
const sequelize = require('../database/index.js');

app.use('/:id', express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(responseTime());

const getEarningData = (request, response) => {
  return app.get('/api/earnings/:id', (req, res) => {
    sequelize.getEarning(req.params.id)
    // sequelize.query(`SELECT * FROM earnings WHERE ticker = ${req.params.id}`)
      .then( (data) => {
        client.setex(req.params.id, 3600, JSON.stringify(data));
        response.json(data);
      })
      .catch( (err) => {
        response.send(err);
      })
  });
}

const getCache = (req, res) => {
  client.get(req.params.id, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getEarningData(req, res);
    }
  });
}

app.get('/api/earnings/:id', getCache);

app.post('/api/earnings/', (req, res) => {
  sequelize.postEarning(req.body)
    .then( (response) => {
      res.status(201);
    })
    .catch( (err) => {
      res.send(err);
    })
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
