const fetch = require('node-fetch');

function verifyTarget (target) {
  return Promise.resolve();
}

function runHTTPtask (task) {
  return verifyTarget()
    .then(() => {
      // run the trigger job
      // if (type === 'api_callback') TOOD
      return fetch(task.uri, { method: 'POST', data: task.payload })
        .then((res) => {
          if (res.ok) {
            console.log('Success from remote host webhook');
          }
        });
    });
}

module.exports = function (tasks) {
  return new Promise((resolve, reject) => {
    const runningTasks = tasks.map((task) => {
      console.log('Running task', task.type);
      switch (task.type) {
        case 'api_callback':
          return runHTTPtask(task).then(resolve).catch(reject);
        default:
          return reject(new Error(`No runner matching task ${task.type}`));
      }
    });

    return Promise.all(runningTasks);
  });
};
