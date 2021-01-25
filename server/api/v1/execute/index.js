const admin = require("firebase-admin");
const express = require("express");

const db = require("../../../lib/datastore");
const taskRunner = require("../../../lib/tasks");

const dateFormat = require("dateformat");

const router = express.Router();

function taskReporter(userID, { status }) {
  const period = dateFormat(new Date(), "UTC:mmm-yyyy");

  console.log("Reporting trigger usage");

  const usageRef = db.doc(`users/${userID}/usage/${period}`);
  usageRef.set(
    {
      total: admin.firestore.FieldValue.increment(1),
      [status]: admin.firestore.FieldValue.increment(1),
    },
    { merge: true }
  );
}

router.post("/", (req, res) => {
  const jobID = req.body.jobID;
  const userID = req.body.userID;

  const docRef = db.doc(`users/${userID}/jobs/${jobID}`);

  docRef
    .get()
    .then((doc) => {
      console.log(`Job ${jobID} - Processing`);

      const jobData = doc.data();
      docRef.update({ status: "processing" });

      return taskRunner(userID, jobData);
    })
    .then((result) => {
      console.log(`Job ${jobID} - Complete`);

      const jobResult = {
        status: result.status ? "complete" : "failed",
        result,
      };

      return docRef.set(jobResult, { merge: true }).then(() => {
        return taskReporter(userID, jobResult);
      });
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(`Job ${jobID} - Failed`);
      console.error(error);

      docRef.update({ status: "failed" }).then(() => {
        res.sendStatus(500);
      });
    });
});

module.exports = router;
