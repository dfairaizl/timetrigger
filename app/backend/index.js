import firebase from 'firebase';

// Required for side-effects
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBvdk2NRKDO5ieQbBKuFzdDczDKZU92tm8',
  authDomain: 'timetrigger-5a192.firebaseapp.com',
  databaseURL: 'https://timetrigger-5a192.firebaseio.com',
  projectId: 'timetrigger-5a192',
  storageBucket: 'timetrigger-5a192.appspot.com',
  messagingSenderId: '987939680502'
};

firebase.initializeApp(config);

export default firebase;
