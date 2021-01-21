import auth, { authStatus } from "../services/auth";
import {
  updateAuthStatus,
  updateAccount,
  addTimeTrigger,
  updateTimeTrigger,
  deleteTimeTrigger,
  addTarget,
  updateTarget,
  deleteTarget,
} from "./actions";
import db from "../services/db";

export function observeAuthStatus() {
  return (dispatch) => {
    authStatus((user) => {
      dispatch(updateAuthStatus(user));

      if (user) {
        dispatch(observeAccount(user));
        dispatch(observeTriggers(user));
        dispatch(observeTargets(user));
      }
    });
  };
}

export function observeTriggers() {
  return (dispatch) => {
    const uid = auth().currentUser.uid;
    const ref = db()
      .collection(`users/${uid}/jobs`)
      .orderBy("trigger_at", "desc");

    ref.onSnapshot(
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            dispatch(
              addTimeTrigger({
                id: change.doc.id,
                display: change.type,
                ...change.doc.data(),
              })
            );
          }

          if (change.type === "modified") {
            dispatch(
              updateTimeTrigger({
                id: change.doc.id,
                display: change.type,
                ...change.doc.data(),
              })
            );
          }

          if (change.type === "removed") {
            dispatch(
              deleteTimeTrigger({
                id: change.doc.id,
                display: change.type,
                ...change.doc.data(),
              })
            );
          }
        });
      },
      (error) => {
        console.error("subscriptions/observeTriggers error:", error);
      }
    );
  };
}

export function observeAccount() {
  return (dispatch) => {
    const uid = auth().currentUser.uid;
    const ref = db().doc(`users/${uid}`);

    ref.onSnapshot(
      (snapshot) => {
        const account = snapshot.data();
        dispatch(updateAccount(account));
      },
      (error) => {
        console.error("subscriptions/observeAccount error:", error);
      }
    );
  };
}

export function observeTargets() {
  return (dispatch) => {
    const uid = auth().currentUser.uid;
    const ref = db().collection(`users/${uid}/targets`);

    ref.onSnapshot(
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            dispatch(addTarget({ id: change.doc.id, ...change.doc.data() }));
          }

          if (change.type === "modified") {
            dispatch(updateTarget({ id: change.doc.id, ...change.doc.data() }));
          }

          if (change.type === "removed") {
            dispatch(deleteTarget({ id: change.doc.id, ...change.doc.data() }));
          }
        });
      },
      (error) => {
        console.error("subscriptions/observeTargets error:", error);
      }
    );
  };
}
