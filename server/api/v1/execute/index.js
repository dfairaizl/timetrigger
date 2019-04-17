const express = require('express');
const db = require('../../../lib/datastore');
const taskRunner = require('../../../lib/tasks');

const router = express.Router();

router.post('/', (req, res) => {
  const jobID = req.body.jobID;
  const docRef = db.collection('jobs').doc(jobID);

  docRef.get()
    .then((doc) => {
      console.log(`Job ${jobID} - Processing`);

      const jobData = doc.data();
      docRef.update({ status: 'processing' });

      return taskRunner(jobData.run);
    }).then(() => {
      console.log(`Job ${jobID} - Complete`);
      docRef.update({ status: 'complete' });
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      console.log(`Job ${jobID} - Failed`);
      docRef.update({ status: 'failed' });
      res.sendStatus(500);
    });
});

module.exports = router;
