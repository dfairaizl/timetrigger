const express = require("express");
const nanoid = require("nanoid");

const db = require("../../../lib/datastore");
const jwtValidate = require("../../../middleware/jwt");
const verifyTarget = require("../../../lib/target-verification");

const router = express.Router();

function generateTargetIdentifier(uid) {
  return Buffer.from(nanoid()).toString("base64");
}

router.post("/code", jwtValidate, (req, res) => {
  res.json({ verfication_code: generateTargetIdentifier() });
});

router.get("/verify", jwtValidate, (req, res) => {
  const user = res.locals.user;
  const targetId = req.query.target;

  if (!targetId) {
    return res.sendStatus(422);
  }

  const doc = db
    .collection("users")
    .doc(user.uid)
    .collection("targets")
    .doc(targetId);
  doc
    .get()
    .then(snapshot => {
      const targetData = snapshot.data();
      return verifyTarget(targetData);
    })
    .then(verified => {
      if (verified) {
        return doc
          .set({ verified, active: true }, { merge: true })
          .then(() => res.sendStatus(200));
      }

      res.sendStatus(424); // failed dependency
    })
    .catch(e => {
      console.error(e);
      res.sendStatus(500);
    });
});

module.exports = router;
