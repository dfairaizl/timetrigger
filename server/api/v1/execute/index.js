const express = require('express');
const db = require('../../../lib/datastore');
const taskRunner = require('../../../lib/tasks');

const router = express.Router();

router.post('/', (req, res) => {
  const jobID = req.body.jobID;
  const userID = req.body.userID;

  const docRef = db.doc(`users/${userID}/jobs/${jobID}`);

  docRef.get()
    .then((doc) => {
      console.log(`Job ${jobID} - Processing`);

      const jobData = doc.data();
      docRef.update({ status: 'processing' });

      return taskRunner(userID, jobData);
    }).then(() => {
      console.log(`Job ${jobID} - Complete`);

      return docRef.update({ status: 'complete' }).then(() => {
        res.sendStatus(200);
      });
    })
    .catch((error) => {
      console.error(`Job ${jobID} - Failed`);
      console.error(error);

      docRef.update({ status: 'failed' }).then(() => {
        res.sendStatus(500);
      });
    });
});

module.exports = router;
