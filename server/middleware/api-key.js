const bcrypt = require('bcrypt');
const db = require('../lib/datastore');

function getRequestKey (req) {
  return req.query['api-key'] || req.headers['x-api-key'];
}

function getRequestSecret (req) {
  return req.query['api-secret'] || req.headers['x-api-secret'];
}

function validateRequest (secret, hash) {
  return bcrypt.compare(secret, hash);
}

module.exports = function (req, res, next) {
  const apiKey = getRequestKey(req);
  const apiSecret = getRequestSecret(req);

  if (!apiKey || !apiSecret) {
    return next();
  }

  db.collection('users').where('credentials.api_key', '==', apiKey)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 1) {
        const snapshot = querySnapshot.docs[0];
        const doc = snapshot.data();

        return validateRequest(apiSecret, doc.credentials.hash).then((result) => {
          if (result) {
            res.locals.user = { uid: snapshot.id };
            return next();
          }

          return res.sendStatus(403);
        });
      }

      return res.sendStatus(403);
    }).catch((e) => {
      console.error(e);
      res.sendStatus(500);
    });
};
