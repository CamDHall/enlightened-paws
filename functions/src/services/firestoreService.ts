/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import * as admin from "firebase-admin";

// user const
// const userCollectionName = "users";
admin.initializeApp();
const db = admin.firestore();

export namespace FirestoreService {

    export async function createDoc(collectionName: string, redcordId: string, data: any = {}) {
      await db
          .collection(collectionName)
          .doc(redcordId)
          .create(data);
    }

    export async function updateDoc(collectionName: string, redcordId: string, data: any) {
      await db
          .collection(collectionName)
          .doc(redcordId)
          .set(data);
    }

    export async function deleteDoc(collectionName: string, redcordId: string) {
      await db
          .collection(collectionName)
          .doc(redcordId)
          .delete();
    }

    // Subcollections
    export async function createSubDoc(oarentCollectionName: string, childCollectionName: string, parentRecordId: string, data: any) {
      await db
          .collection(oarentCollectionName)
          .doc(parentRecordId)
          .collection(childCollectionName)
          .add(data);
    }

    export async function updateSubDoc(oarentCollectionName: string, childCollectionName: string, parentRecordId: string, childRecordId: string, data: any) {
      await db
          .collection(oarentCollectionName)
          .doc(parentRecordId)
          .collection(childCollectionName)
          .doc(childRecordId)
          .set(data);
    }

    export async function deleteSubDoc(oarentCollectionName: string, childCollectionName: string, parentRecordId: string, childRecordId: string) {
      await db
          .collection(oarentCollectionName)
          .doc(parentRecordId)
          .collection(childCollectionName)
          .doc(childRecordId)
          .delete();
    }

    export async function getDoc(collectionName: string, redcordId: string) {
      return (await db
          .collection(collectionName)
          .doc(redcordId)
          .get())
          .data();
    }
}
