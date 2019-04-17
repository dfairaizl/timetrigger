const admin = require('firebase-admin');
const cloudTasks = require('@google-cloud/tasks');
const express = require('express');
const db = require('../../../lib/datastore');
const validate = require('express-validation');
const validation = require('./validation');

const client = new cloudTasks.CloudTasksClient();
const router = express.Router();
const parent = client.queuePath(
  process.env.PROJECT_ID,
  process.env.LOCATION,
  process.env.APP_ENGINE_QUEUE
);

router.post('/', validate(validation.trigger), (req, res) => {
  const taskInfo = req.body;

  const { trigger: triggerAt, run } = taskInfo;

  console.log('Scheduling task to run at', triggerAt.toString());

  db.collection('jobs').add({
    trigger_at: admin.firestore.Timestamp.fromDate(triggerAt),
    user_account: 'dan',
    status: 'scheduled',
    run
  }).then((ref) => {
    console.log('Created new job', ref.id);

    const task = {
      appEngineHttpRequest: {
        httpMethod: 'POST',
        relativeUri: '/api/v1/execute',
        body: Buffer.from(JSON.stringify({ jobID: ref.id })),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      scheduleTime: {
        seconds: triggerAt / 1000
      }
    };

    const request = {
      parent,
      task
    };

    client.createTask(request).then(([response]) => {
      console.log('Scheduled task', response.name);
      res.json({ scheduled: true });
    });
  }).catch((e) => {
    console.log(e);
    res.status(422).json({ scheduled: false });
  });
});

module.exports = router;
