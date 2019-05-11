const admin = require('firebase-admin');
const cloudTasks = require('@google-cloud/tasks');
const chrono = require('chrono-node');
const express = require('express');
const db = require('../../../lib/datastore');
const apiKeyValidate = require('../../../middleware/api-key');
const jwtValidate = require('../../../middleware/jwt');
const validate = require('express-validation');
const validation = require('./validation');

const client = new cloudTasks.CloudTasksClient();
const router = express.Router();
const parent = client.queuePath(
  process.env.PROJECT_ID,
  process.env.LOCATION,
  process.env.APP_ENGINE_QUEUE
);

const d = (req, res, next) => {
  console.log(req.body);
  next();
};

router.post('/', d, apiKeyValidate, jwtValidate, validate(validation.trigger), (req, res) => {
  const taskInfo = req.body;
  const user = res.locals.user;
  const jobCollection = db.collection(`users/${user.uid}/jobs`);

  const { trigger, run } = taskInfo;
  const triggerAt = chrono.parseDate(trigger);

  console.log('Scheduling task to run at', triggerAt.toString());

  jobCollection.add({
    trigger_at: admin.firestore.Timestamp.fromDate(triggerAt),
    status: 'scheduled',
    run
  }).then((ref) => {
    console.log('Created new job', ref.id);

    const task = {
      appEngineHttpRequest: {
        httpMethod: 'POST',
        relativeUri: '/api/v1/execute',
        body: Buffer.from(JSON.stringify({
          userID: user.uid,
          jobID: ref.id
        })),
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
