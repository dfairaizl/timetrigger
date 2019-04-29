const bcrypt = require('bcrypt');
const express = require('express');
const nanoid = require('nanoid');
const uuidv5 = require('uuid/v5');

const db = require('../../../lib/datastore');
const jwtValidate = require('./jwt');

const router = express.Router();

const namespace = process.env.UUID_NAMESPACE;

function generateAPIKey (uid) {
  return Buffer.from(uuidv5(uid, namespace)).toString('base64');
}

function generateSecret () {
  const saltRounds = 10;
  const secret = nanoid();
  return bcrypt.hash(secret, saltRounds).then((hash) => {
    return { secret, hash };
  });
}

router.post('/api-key', jwtValidate, (req, res) => {
  const user = res.locals.user;
  const doc = db.collection('users').doc(user.uid);

  generateSecret().then(({ secret, hash }) => {
    const key = generateAPIKey(user.uid);

    doc.set({
      credentials: {
        api_key: key,
        hash
      }
    }, { merge: true }).then(() => {
      res.status(201).json({ key, secret });
    }).catch((e) => {
      console.error(e);
      res.sendStatus(500);
    });
  });
});

module.exports = router;
