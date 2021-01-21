const fetch = require("cross-fetch");
const db = require("./datastore");
const verifyTarget = require("./target-verification");

function verify(target) {
  return verifyTarget(target.data()).then(() => target.data());
}

function fetchTarget(userID, targetID) {
  return db.doc(`users/${userID}/targets/${targetID}`).get();
}

function runHTTPtask(userID, task) {
  return fetchTarget(userID, task.target)
    .then(verify)
    .then((target) => {
      return fetch(target.endpoint, {
        body: JSON.stringify(task.payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then((res) => {
        console.log("Response from remote host webhook");

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json().then((data) => {
            return {
              body: data,
              response: `${res.status} ${res.statusText}`,
              status: res.ok,
            };
          });
        } else {
          return res.text().then((text) => {
            return {
              body: text,
              response: `${res.status} ${res.statusText}`,
              status: res.ok,
            };
          });
        }
      });
    });
}

module.exports = function (userID, data) {
  return new Promise((resolve, reject) => {
    const task = data.run;

    console.log("Running task", task.type);

    switch (task.type) {
      case "api_callback":
        return runHTTPtask(userID, task).then(resolve).catch(reject);
      default:
        return reject(new Error(`No runner matching task ${task.type}`));
    }
  });
};
