const cloudTasks = require("@google-cloud/tasks");

const client = new cloudTasks.CloudTasksClient();

async function createQueue() {
  const project = process.env.PROJECT_ID;
  const location = process.env.LOCATION;
  const queue = process.env.APP_ENGINE_QUEUE;

  console.log(project, location, queue);

  const [response] = await client.createQueue({
    parent: client.locationPath(project, location),
    queue: {
      name: client.queuePath(project, location, queue),
      appEngineHttpQueue: {
        appEngineRoutingOverride: {
          service: "default",
        },
      },
    },
  });

  console.log(`Created queue ${response.name}`);
}

const args = process.argv.slice(2);
createQueue(...args).catch(console.error);
