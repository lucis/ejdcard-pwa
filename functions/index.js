const functions = require('firebase-functions');

exports.onNewUser = functions.firestore.document('/users/{userId}').onCreate((snap) => {
  return snap.ref.set({roles: 'r'}, {merge: true})
})