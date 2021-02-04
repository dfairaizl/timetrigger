const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

const stripe = Stripe(functions.config().stripe.secret);

exports.subscribeToFreePlan = functions.auth.user().onCreate((user) => {
  // subscribe each new user to the free plan
  const firestore = admin.firestore();
  const doc = firestore.collection("users").doc(user.uid);

  return new Promise((resolve, reject) => {
    doc.onSnapshot((snapshot) => {
      const data = snapshot.data();

      if (data.stripeId) {
        stripe.subscriptions
          .create({
            customer: data.stripeId,
            items: [{ price: functions.config().stripe.free_plan_id }],
          })
          .then(() => {
            resolve();
          });
      } else {
        reject(new Error("User has no Stripe Customer in account"));
      }
    });
  });
});
