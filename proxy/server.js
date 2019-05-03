const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/:stockId', express.static(path.join(__dirname, 'public')));

app.get('/:stockId', (req, res) => {
  axios.get(`/${req.params.stockId}`)
  .then((response) => {
    res.send(response.data);
  })
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
