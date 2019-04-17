const Firestore = require('@google-cloud/firestore');

console.log('new firestore db');
const db = new Firestore();

module.exports = db;
