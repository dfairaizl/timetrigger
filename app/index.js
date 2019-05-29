import React from 'react';
import ReactDOM from 'react-dom';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyBvdk2NRKDO5ieQbBKuFzdDczDKZU92tm8',
  authDomain: 'timetrigger-5a192.firebaseapp.com',
  databaseURL: 'https://timetrigger-5a192.firebaseio.com',
  projectId: 'timetrigger-5a192',
  storageBucket: 'timetrigger-5a192.appspot.com',
  messagingSenderId: '987939680502'
});

const App = require('./App').default;

ReactDOM.render(<App />, document.getElementById('root'));
