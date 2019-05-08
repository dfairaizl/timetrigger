require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const parcelMiddleware = require('./middleware/parcel');
const executeAPI = require('./api/v1/execute');
const targetAPI = require('./api/v1/target');
const triggerAPI = require('./api/v1/trigger');
const userAPI = require('./api/v1/user');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1/execute', executeAPI);
app.use('/api/v1/target', targetAPI);
app.use('/api/v1/trigger', triggerAPI);
app.use('/api/v1/user', userAPI);

if (process.env.NODE_ENV === 'development') {
  parcelMiddleware(app);
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json(err);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
