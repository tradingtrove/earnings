const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
// const redis = require('redis');
// const responseTime = require('response-time');
// const client = redis.createClient();

const app = express();
const port = process.env.PORT || 80;

// app.use(responseTime());
app.use('/:stockId', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const chartReq = axios.create({
//   baseURL: 'http://ec2-13-57-177-212.us-west-1.compute.amazonaws.com:2468/'
// });

// const getStock = (req, res) => {
//   return axios.get(`/${req.params.stockId}`)
//   .then((response) => {
//     res.send(response.data);
//   })
//   .catch((err) => {
//     res.sendStatus(500).send(err);
//   })
// }

// const getCache = (req, res) => {
//   client.get(`/${req.params.stockId}`, (err, result) => {
//     if (result) {
//       res.send(result);
//     } else {
//       getStock(req, res);
//     }
//   });
// }

// app.get('/:stockId', getCache);

app.get('/:stockId', (req, res) => {
  axios.get(`/${req.params.stockId}`)
  .then((response) => {
    res.send(response.data);
  })
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
