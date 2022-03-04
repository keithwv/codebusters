const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

admin.initializeApp();
const db = admin.firestore();

const algoliaClient = algoliasearch(
   "SBRLXSRY2E",
    process.env.ADMIN_KEY
);



const collectionIndex = algoliaClient.initIndex('dev_EVENTS');

exports.postsWatcher = functions.firestore
  .document("events/{eventId}")
  .onWrite((change, context) => {
    let eventData = change.after.exists ? change.after.data() : null;
    let eventId = change.after.id;

    // event has been deleted, remove it from algolia
    if (!eventData) {
      let id = change.before.id;
      console.log(`DELETING: event id is ${id}`);
      return collectionIndex.deleteObject(id);
    }

    // insert/update the post in algolia
    const record = {
      objectID: eventId,
      ...eventData,
    };

    return collectionIndex.saveObject(record);
  });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.sendCollectionToAlgolia = functions.https.onRequest(async (req, res) => {

// 	// This array will contain all records to be indexed in Algolia.
// 	// A record does not need to necessarily contain all properties of the Firestore document,
// 	// only the relevant ones.
// 	const algoliaRecords = [];

// 	// Retrieve all documents from the COLLECTION collection.
// 	const querySnapshot = await db.collection('events').get();

// 	querySnapshot.docs.forEach(doc => {
// 		const document = doc.data();
//         // Essentially, you want your records to contain any information that facilitates search,
//         // display, filtering, or relevance. Otherwise, you can leave it out.
//         const record = {
//             objectID: doc.id,
//             relevantProperty1: document.title,
// 			relevantProperty2: document.start_time,
// 			relevantProperty3: document.status
//         };

//         algoliaRecords.push(record);
//     });
//     	// After all records are created, we save them to
// 	collectionIndex.saveObjects(algoliaRecords, (_error, content) => {
//         res.status(200).send("COLLECTION was indexed to Algolia successfully.");
//     });

// });

// exports.collectionOnCreate = functions.firestore.document('events/{uid}').onCreate(async (snapshot, context) => {
//     await saveDocumentInAlgolia(snapshot);
// });

// exports.collectionOnUpdate = functions.firestore.document('events/{uid}').onUpdate(async (change, context) => {
//     await updateDocumentInAlgolia(change);
// });

// exports.collectionOnDelete = functions.firestore.document('events/{uid}').onDelete(async (snapshot, context) => {
//     await deleteDocumentFromAlgolia(snapshot);
// });

// async function saveDocumentInAlgolia(snapshot) {
//     if (snapshot.exists) {
//         const record = snapshot.data();
//         if (record) { // Removes the possibility of snapshot.data() being undefined.
//             if (record === false) { // We only index products that are complete.
//                 record.objectID = snapshot.id;

//                 // In this example, we are including all properties of the Firestore document
//                 // in the Algolia record, but do remember to evaluate if they are all necessary.
//                 // More on that in Part 2, Step 2 above.

//                 await collectionIndex.saveObject(record); // Adds or replaces a specific object.
//             }
//         }
//     }
// }

// async function updateDocumentInAlgolia(change) {
//     const docBeforeChange = change.before.data()
//     const docAfterChange = change.after.data()
//     if (docBeforeChange && docAfterChange) {

//         if (docAfterChange && !docBeforeChange) {
//             // If the doc was COMPLETE and is now INCOMPLETE, it was
//             // previously indexed in algolia and must now be removed.
//             await deleteDocumentFromAlgolia(change.after);
//         } else if (docAfterChange.isIncomplete === false) {
//             await saveDocumentInAlgolia(change.after);
//         }
//     }
// }

// async function deleteDocumentFromAlgolia(snapshot) {
//     if (snapshot.exists) {
//         const objectID = snapshot.id;
//         await collectionIndex.deleteObject(objectID);
//     }
// }
