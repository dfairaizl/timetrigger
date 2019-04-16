const chrono = require('chrono-node');
const express = require('express');
const router = express.Router();

const cloudTasks = require('@google-cloud/tasks');

const client = new cloudTasks.CloudTasksClient();

const parent = client.queuePath(
  process.env.PROJECT_ID,
  process.env.LOCATION,
  process.env.APP_ENGINE_QUEUE
);

function validateBody (body) {
  const defaultPayload = {
    scheduledTime: 'now',
    data: {}
  };

  return { ...defaultPayload, ...body };
}

// new trigger
router.post('/', (req, res) => {
  const taskInfo = validateBody(req.body);
  console.log(taskInfo);

  const scheduledTime = chrono.parseDate(taskInfo.scheduledTime);

  console.log('Scheduling task to run at', scheduledTime.toString());

  const task = {
    appEngineHttpRequest: {
      httpMethod: 'POST',
      relativeUri: '/api/v1/execute',
      body: Buffer.from(JSON.stringify(taskInfo.data)),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    scheduleTime: {
      seconds: scheduledTime / 1000 // 30 seconds from now
    }
  };

  const request = {
    parent,
    task
  };

  return client.createTask(request).then(([response]) => {
    console.log('Scheduled task', response.name);
    res.json({ scheduled: true });
  }).catch((e) => {
    console.log(e);
    res.status(422).json({ scheduled: false });
  });
});

module.exports = router;
