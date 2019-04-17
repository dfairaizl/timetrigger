require('dotenv').config();

const { resolve } = require('path');
const bodyParser = require('body-parser');
const Bundler = require('parcel-bundler');
const express = require('express');
const morgan = require('morgan');

const executeAPI = require('./api/v1/execute');
const triggerAPI = require('./api/v1/trigger');

const app = express();

const entry = resolve(__dirname, '..', 'app', 'index.html');
const bundler = new Bundler(entry, {});

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1/execute', executeAPI);
app.use('/api/v1/trigger', triggerAPI);
app.use('/echo', (req, res) => {
  res.status(200).send(req.body.data);
});

app.use(bundler.middleware());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json(err);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
