const fetch = require('cross-fetch');
const db = require('./datastore');
const verifyTarget = require('./target-verification');

function verify (target) {
  return verifyTarget(target.data())
    .then(() => target.data());
}

function fetchTarget (userID, targetID) {
  return db.doc(`users/${userID}/targets/${targetID}`).get();
}

function runHTTPtask (userID, task) {
  return fetchTarget(userID, task.target)
    .then(verify)
    .then((target) => {
      return fetch(target.endpoint, { method: 'POST', data: task.payload })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Target endpoint did not repsond with success');
          }

          console.log('Success from remote host webhook');
        });
    });
}

module.exports = function (userID, data) {
  return new Promise((resolve, reject) => {
    const runningTasks = data.run.map((task) => {
      console.log('Running task', task.type);
      switch (task.type) {
        case 'api_callback':
          return runHTTPtask(userID, task).then(resolve).catch(reject);
        default:
          return reject(new Error(`No runner matching task ${task.type}`));
      }
    });

    return Promise.all(runningTasks);
  });
};
