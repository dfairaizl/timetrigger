import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBvdk2NRKDO5ieQbBKuFzdDczDKZU92tm8',
  authDomain: 'timetrigger-5a192.firebaseapp.com',
  databaseURL: 'https://timetrigger-5a192.firebaseio.com',
  projectId: 'timetrigger-5a192',
  storageBucket: 'timetrigger-5a192.appspot.com',
  messagingSenderId: '987939680502'
};

const app = firebase.initializeApp(config);

export default app;
