/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import {AuthData} from "firebase-functions/lib/common/providers/tasks";

import {UserRecord} from "firebase-functions/v1/auth";
import {FirestoreService} from "./services/firestoreService";

const usersCollectionName = "users";

export const getUserDetails = functions.https.onCall(async (data, context) => {
  functions.logger.info("getUserDetails", data);
  await authorization(context.auth);

  return await FirestoreService.getDoc(usersCollectionName, context.auth!.uid);
});

export const postUserDetails = functions.https.onCall(async (data, context) => {
  functions.logger.info("postUserDetails", data);
  await authorization(context.auth);

  return await FirestoreService.updateDoc(usersCollectionName, context.auth!.uid, data);
});

exports.userCreation = functions.auth.user().onCreate(async (user: UserRecord) => {
  await FirestoreService.createDoc(usersCollectionName, user.uid);
});

exports.userDeletion = functions.auth.user().onDelete(async (user: UserRecord) => {
  await FirestoreService.deleteDoc(usersCollectionName, user.uid);
});

async function authorization(authData?: AuthData) {
  if (!authData) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called " +
            "while authenticated.");
  }
}
