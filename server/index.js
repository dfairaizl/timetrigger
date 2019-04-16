require('dotenv').config();

const { STATUS_CODES } = require('http');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const executeAPI = require('./api/v1/execute');
const triggerAPI = require('./api/v1/trigger');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1/execute', executeAPI);
app.use('/api/v1/trigger', triggerAPI);

app.get('*', (req, res) => {
  res.send(STATUS_CODES[200]);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json(err);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
