const { resolve } = require('path');
const Bundler = require('parcel-bundler');

module.exports = function (app) {
  const entry = resolve(__dirname, '..', '..', 'app', 'index.html');
  const bundler = new Bundler(entry, {});
  app.use(bundler.middleware());
};
