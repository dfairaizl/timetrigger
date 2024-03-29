const admin = require("firebase-admin");
const cloudTasks = require("@google-cloud/tasks");
const chrono = require("chrono-node");
const express = require("express");
const db = require("../../../lib/datastore");
const apiKeyValidate = require("../../../middleware/api-key");
const jwtValidate = require("../../../middleware/jwt");
const { body, validationResult } = require("express-validator");

const client = new cloudTasks.CloudTasksClient();
const router = express.Router();
const parent = client.queuePath(
  process.env.PROJECT_ID,
  process.env.LOCATION,
  process.env.APP_ENGINE_QUEUE
);

const chronoValidator = (value) => {
  const parsed = chrono.parseDate(value);

  if (parsed) {
    return true;
  }

  throw new Error(
    "Invalid date format: Date must be a human readable date string"
  );
};

router.post(
  "/",
  // auth middlewares
  apiKeyValidate,
  jwtValidate,

  // validation middlwares
  body("trigger").custom(chronoValidator),
  body("run.type").isIn(["api_callback"]),
  body("run.target")
    .exists({ checkFalsy: true })
    .withMessage("Triggers must have a valid target API"),
  body("run.payload")
    .isJSON()
    .withMessage("Payload must be a valid JSON object"),

  // handler
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const taskInfo = req.body;
    const user = res.locals.user;
    const jobCollection = db.collection(`users/${user.uid}/jobs`);

    const { trigger, run } = taskInfo;
    const triggerAt = chrono.parseDate(trigger);

    console.log("Scheduling task to run at", triggerAt.toString());

    jobCollection
      .add({
        trigger_at: admin.firestore.Timestamp.fromDate(triggerAt),
        status: "scheduled",
        run,
      })
      .then((ref) => {
        console.log("Created new job", ref.id);

        const task = {
          appEngineHttpRequest: {
            httpMethod: "POST",
            relativeUri: "/api/v1/execute",
            body: Buffer.from(
              JSON.stringify({
                userID: user.uid,
                jobID: ref.id,
              })
            ),
            headers: {
              "Content-Type": "application/json",
            },
          },
          scheduleTime: {
            seconds: triggerAt / 1000,
          },
        };

        const request = {
          parent,
          task,
        };

        client.createTask(request).then(([response]) => {
          console.log("Scheduled task", response.name);
          res.json({ scheduled: true });
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(422).json({ scheduled: false });
      });
  }
);

module.exports = router;
