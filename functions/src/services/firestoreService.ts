/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {firestore} from "firebase-admin";

export namespace FirestoreService {
    export async function create(db: firestore.Firestore, collectionName: string, redcordId: string, data: any = {}) {
      await db
          .collection(collectionName)
          .doc(redcordId)
          .create(data);
    }

    export async function update(db: firestore.Firestore, collectionName: string, redcordId: string, data: any = false) {
      await db
          .collection(collectionName)
          .doc(redcordId)
          .set(data);
    }

    export async function deleteDoc(db: firestore.Firestore, collectionName: string, redcordId: string) {
      await db
          .collection(collectionName)
          .doc(redcordId)
          .delete();
    }
}
