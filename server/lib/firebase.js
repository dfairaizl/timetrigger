const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
});

module.exports = admin;
