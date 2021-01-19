import firebase from "firebase/app";

console.log(firebase);

export function registerAccount(email, password) {
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
}

export function signOut() {
  const auth = firebase.auth();
  return auth.signOut();
}

export function getIDToken() {
  const auth = firebase.auth();
  return auth.currentUser.getIdToken(true);
}

export function authStatus(callback) {
  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}

export function updateEmail(email) {
  const auth = firebase.auth();
  const user = auth.currentUser;

  return user.updateEmail(email);
}

export function updatePassword(password) {
  const auth = firebase.auth();
  const user = auth.currentUser;

  return user.updatePassword(password);
}

export default () => {
  return firebase.auth();
};
