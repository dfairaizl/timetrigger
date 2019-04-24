import firebase from '../backend';

const auth = firebase.auth();

export function registerAccount (email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function signOut () {
  return auth.signOut();
}

export function authStatus (callback) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}

export default auth;
