import firebase from "firebase/app";

import auth, { authStatus } from "../services/auth";
import {
  addTarget,
  addTimeTrigger,
  deleteTarget,
  deleteTimeTrigger,
  setCurrentSubscription,
  setPortalURL,
  setSubscriptionPlan,
  updateAccount,
  updateAuthStatus,
  updateTarget,
  updateTimeTrigger,
} from "./actions";
import db from "../services/db";

export function observeAuthStatus() {
  return (dispatch) => {
    authStatus((user) => {
      dispatch(updateAuthStatus(user));

      if (user) {
        dispatch(fetchSubscriptionPlans());
        dispatch(fetchPortalLink());
        dispatch(fetchCurrentSubscription());

        dispatch(observeAccount(user));
        dispatch(observeTriggers(user));
        dispatch(observeTargets(user));
      }
    });
  };
}

export function fetchPortalLink() {
  return (dispatch) => {
    const functionRef = firebase
      .app()
      .functions("us-central1")
      .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");

    functionRef({ returnUrl: window.location.origin }).then(({ data }) => {
      dispatch(setPortalURL(data.url));
    });
  };
}

export function fetchSubscriptionPlans() {
  return (dispatch) => {
    db()
      .collection("plans")
      .where("active", "==", true)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(async function (doc) {
          const planData = doc.data();

          const snap = await doc.ref.collection("prices").get();

          planData.price = snap.docs[0].data();
          dispatch(setSubscriptionPlan(doc.id, planData));
        });
      });
  };
}

export function fetchCurrentSubscription() {
  return (dispatch) => {
    const uid = auth().currentUser.uid;

    db()
      .collection("users")
      .doc(uid)
      .collection("subscriptions")
      .where("status", "in", ["trialing", "active"])
      .get()
      .then((snapshot) => {
        const planData = snapshot.docs[0].data();
        return planData.product.get();
      })
      .then((doc) => {
        dispatch(setCurrentSubscription(doc.id));
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
