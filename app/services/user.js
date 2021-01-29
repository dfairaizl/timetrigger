import fetch from "cross-fetch";
import auth, { getIDToken } from "./auth";
import db from "./db";

export function createUser() {
  const uid = auth().currentUser.uid;
  const ref = db().doc(`users/${uid}`);

  const unsubscribe = ref.onSnapshot(
    (snapshot) => {
      const account = snapshot.data();

      if (account && account.stripeId) {
        getIDToken().then((token) => {
          return fetch(`${process.env.API_HOST}/api/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
            method: "POST",
          }).then(() => {
            unsubscribe();
          });
        });
      }
    },
    (error) => {
      console.error("account onSnapshot error:", error);
    }
  );
}
