import firebase from '../backend';

const auth = firebase.auth();

export function registerAccount (email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}
