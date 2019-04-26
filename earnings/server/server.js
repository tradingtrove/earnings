const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const sequelize = require('../database/index.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/api/earnings/:id', (req, res) => {
  sequelize.getEarning(req.params.id)
    .then( (data) => {
      res.json(data);
    })
    .catch( (err) => {
      res.send(err);
    })
});

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
