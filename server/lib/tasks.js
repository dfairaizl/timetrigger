const { Resolver } = require('dns').promises;
const fetch = require('node-fetch');
const { URL } = require('url');

const resolver = new Resolver();

function verifyTxt (records) {
  return Promise.resolve();
}

function runHTTPtask (task) {
  // verify remote server
  const url = new URL(task.uri);
  const hostname = url.host;
  console.log('Resolving DNS for', hostname);
  // return resolver.resolveTxt(hostname)
  //   .then(verifyTxt())
  //   .then(() => {
  //     // then hit the endpoint
  //     return fetch(task.uri, { method: 'POST', data: task.payload })
  //       .then((res) => {
  //         if (res.ok) {
  //           console.log('Success from remote host webhook');
  //         }
  //       });
  //   });

  return verifyTxt()
    .then(() => {
      // then hit the endpoint
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
