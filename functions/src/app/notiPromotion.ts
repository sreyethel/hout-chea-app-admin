// import * as admin from "firebase-admin";
// export async function pushToArray(data: admin.firestore.QuerySnapshot) {
//     if (data.empty) return null;
//     return data.docs.map(m => { return { ...m.data() } })
// }
// export function pushToObject(snapshot: admin.firestore.DocumentSnapshot) {
//     return { ...snapshot.data(), id: snapshot.id }
// }
// export async function userNotiOnPromotions(data: any, context: any) {
//     const message = {
//         topic: `Promotions`,
//         data: {
//             title: data.promotion_name,
//             body: data.promotion_description,
//             key: data.key,
//         },
//         notification: {
//             title: data.promotion_name,
//             body: data.promotion_description,
//             imageUrl: data.promotion_fileUrl
//         },
//         apns: {
//             payload: {
//                 aps: {
//                     "mutable-content": 1,
//                     sound: "default",
//                     image: data.promotion_fileUrl,
//                     imageUrl: data.promotion_fileUrl,
//                 }
//             },
//             fcm_options: {
//                 image: data.promotion_fileUrl
//             }
//         },
//         android: {
//             notification: {
//                 title: data.promotion_name,
//                 body: data.promotion_description,
//                 image: data.promotion_fileUrl,
//                 sound: "default"
//             }
//         }
//     };
//     admin
//         .messaging()
//         .send(message)
//         .then(response => {
//         })
//         .catch(error => {
//         });
// }

