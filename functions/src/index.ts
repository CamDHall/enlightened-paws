/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import {AuthData} from "firebase-functions/lib/common/providers/tasks";

import * as admin from "firebase-admin";
import {UserRecord} from "firebase-functions/v1/auth";
import {FirestoreService} from "./services/firestoreService";


admin.initializeApp();
const db = admin.firestore();

export const userDetails = functions.https.onCall(async (data, context) => {
  functions.logger.info("userDetails", data);
  await authorization(context.auth);
});

exports.userCreation = functions.auth.user().onCreate(async (user: UserRecord) => {
  await FirestoreService.create(db, "users", user.uid);
  // await db
  //     .collection("users")
  //     .doc(user.uid)
  //     .create({})
  //     .catch((error) => {
  //         functions.logger.error("CreateUser Error: ", error)
  //     });
});

async function authorization(authData?: AuthData) {
  if (!authData) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called " +
            "while authenticated.");
  }
}
