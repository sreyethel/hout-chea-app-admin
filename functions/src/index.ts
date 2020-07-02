// import * as functions from 'firebase-functions';
// import * as admin from "firebase-admin";
// // import { userNotiOnPromotions } from './app/notiPromotion';
// // import { storeNotiOnOrder } from './app/storeNoti'
// import { userNotiOnOrder } from './app/userNoti'
// admin.initializeApp(functions.config().firebase);
// const fdb = admin.firestore();
// fdb.settings({ timestampsInSnapshots: true });

// // export const notiPromotion = functions.firestore
// //     .document('promotions/{id}').onCreate((change, context) => {
// //         return userNotiOnPromotions(change.data(), context)
// //     });

// // export const notiStoreOrder = functions.firestore
// //     .document('orders/{id}').onCreate((change, context) => {
// //         return storeNotiOnOrder(change.data(), context)
// //     });

// export const userOnOrder = functions.firestore
//     .document('orders/{id}').onUpdate((change, context) => {
//         return userNotiOnOrder(change.after.data(), context)
//     })