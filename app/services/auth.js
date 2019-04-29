import 'firebase/auth';
import app from '../backend';

const auth = app.auth();

export function registerAccount (email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function signIn (email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signOut () {
  return auth.signOut();
}

export function getIDToken () {
  return auth.currentUser.getIdToken(true);
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
