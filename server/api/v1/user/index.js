const bcrypt = require("bcrypt");
const express = require("express");
const Stripe = require("stripe");
const { nanoid } = require("nanoid");
const { v5: uuidv5 } = require("uuid");

const db = require("../../../lib/datastore");
const jwtValidate = require("../../../middleware/jwt");

const stripe = Stripe(process.env.STRIPE_SECRET);

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

router.post("/", jwtValidate, (req, res) => {
  // subscribe each new user to the free plan
  const user = res.locals.user;
  const doc = db.collection("users").doc(user.uid);

  doc
    .get()
    .then((snapshot) => {
      const data = snapshot.data();

      if (data.stripeId) {
        stripe.subscriptions
          .create({
            customer: data.stripeId,
            items: [{ price: process.env.STRIPE_FREE_PLAN_ID }],
          })
          .then((subscription) => {
            console.log(subscription);
            return res.sendStatus(200);
          });
      }

      throw new Error("User has no Stripe Customer in account");
    })
    .catch((e) => {
      console.error(e);
      res.sendStatus(500);
    });
});

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
