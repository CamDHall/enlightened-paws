/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import {AuthData} from "firebase-functions/lib/common/providers/tasks";

import {UserRecord} from "firebase-functions/v1/auth";
import {FirestoreService} from "./services/firestoreService";

const usersCollectionName = "users";
const dogSubCollectionName = "dogs";

// User
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

// Dog
export const addDog = functions.https.onCall(async (data, context) => {
  functions.logger.info("addDog", data);
  await authorization(context.auth);

  console.log(context.auth?.uid)
  return FirestoreService.createSubDoc(usersCollectionName, dogSubCollectionName, context.auth!.uid, data);
});

export const postDog = functions.https.onCall(async (data, context) => {
  functions.logger.info("postDog", data);
  await authorization(context.auth);

  return FirestoreService.updateSubDoc(usersCollectionName, dogSubCollectionName, context.auth!.uid, extractSubRecordIdFromData(data), data);
});

export const deleteDog = functions.https.onCall(async (data, context) => {
  functions.logger.info("deleteDog", data);
  await authorization(context.auth);

  if (data === undefined || data === null || data == "") {
    throw new Error("dogId cannot be empty or null");
  }
  return FirestoreService.deleteSubDoc(usersCollectionName, dogSubCollectionName, context.auth!.uid, data);
});

// Triggers
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

function extractSubRecordIdFromData(data: any) {
  try {
    const recordId = data["id"];
    console.log(data);

    if (recordId === undefined || recordId === null || recordId == "") {
      throw new Error("subId cannot be empty or null");
    }

    return recordId;
  } catch (error) {
    functions.logger.error("Error parsing sub ID", data);
    throw new functions.https.HttpsError("invalid-argument", "Sub ID cannot be null or empty");
  }
}
