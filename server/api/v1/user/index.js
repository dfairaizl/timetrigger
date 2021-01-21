const bcrypt = require("bcrypt");
const express = require("express");
const nanoid = require("nanoid");
const { v5: uuidv5 } = require("uuid");

const db = require("../../../lib/datastore");
const jwtValidate = require("../../../middleware/jwt");

const router = express.Router();

const namespace = process.env.UUID_NAMESPACE;

function generateAPIKey(uid) {
  return Buffer.from(uuidv5(uid, namespace)).toString("base64");
}

function generateSecret() {
  const saltRounds = 10;
  const secret = nanoid();
  return bcrypt.hash(secret, saltRounds).then((hash) => {
    return { secret, hash };
  });
}

router.get("/api-key", jwtValidate, (req, res) => {
  const user = res.locals.user;
  const doc = db.collection("users").doc(user.uid);

  doc
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      if (data.credentials) {
        return res.json({
          apiKey: snapshot.data().credentials.api_key,
        });
      }

      return res.json({});
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(500);
    });
});

router.post("/api-key", jwtValidate, (req, res) => {
  const user = res.locals.user;
  const doc = db.collection("users").doc(user.uid);

  generateSecret().then(({ secret, hash }) => {
    const key = generateAPIKey(user.uid);

    doc
      .set(
        {
          credentials: {
            api_key: key,
            hash,
          },
        },
        { merge: true }
      )
      .then(() => {
        res.status(201).json({ key, secret });
      })
      .catch((e) => {
        console.error(e);
        res.sendStatus(500);
      });
  });
});

module.exports = router;
