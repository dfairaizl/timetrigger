const admin = require('../../../lib/firebase');

function getBearerToken (token = '') {
  return token.split(' ')[1];
}

module.exports = function (req, res, next) {
  const idToken = getBearerToken(req.headers.authorization);

  admin.auth().verifyIdToken(idToken)
    .then((token) => {
      res.locals.user = token;
      next();
    }).catch((error) => {
      console.error(error);
      return res.sendStatus(403);
    });
};
