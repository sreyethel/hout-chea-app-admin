// import * as admin from "firebase-admin";
// export async function pushToArray(data: admin.firestore.QuerySnapshot) {
//     if (data.empty) return null;
//     return data.docs.map(m => { return { ...m.data() } })
// }
// export function pushToObject(snapshot: admin.firestore.DocumentSnapshot) {
//     return { ...snapshot.data(), id: snapshot.id }
// }

// export async function userNotiOnOrder(data: any, context: any) {
//     let tokens: any = []
//     const db = admin.firestore()
//     const store: any = data.name
//     if (store == "adminstore") {
//         const uid = data.user.id;
//         const items: any = await db
//             .collection('customer')
//             .doc(uid)
//             .collection("fcmToken")
//             .get().then((doc: any) => {
//                 const item = pushToArray(doc)
//                 return item
//             }).catch(function (error) {
//                 console.log("Error getting document:", error)
//             });
//         items.forEach((result: any) => {
//             const token: any = result.key
//             tokens.push(token)
//         });
//         const increment = admin.firestore.FieldValue.increment(1);
//         const update = {
//             badge: increment
//         }
//         await db.collection('customer').doc(uid).update(update)
//         await db.collection('customer').doc(uid).collection('orders').doc(data.key).update(data)
//         // await db.collection('store').doc('gcz7Zu6VOZnoc0XiSvNH').collection('storeOrder').doc(data.key).update(data)
//         function createId() {
//             return db.collection('customer').doc().id;
//         }
//         const cover: any = await data.items.map((m: any) => {
//             return m.item.cover
//         })
//         const dataSubmit: any = {
//             key: createId(),
//             page_key: Number(new Date()),
//             date_create: new Date(),
//             user: data.user.fullName,
//             user_contact: data.user.phone,
//             items_cover: cover,
//             order_key: data.key,
//             status: data.order_status,
//             name: "New Order",
//         }
//         await db.collection('customer').doc(uid).collection('notification').doc(dataSubmit.key).set(dataSubmit)
//         const badge: any = await db
//             .collection('customer')
//             .doc(uid)
//             .get().then((doc: any) => {
//                 const item: any = pushToObject(doc)
//                 const data = item.badge ? item.badge : 1
//                 return String(data)
//             }).catch(function (error) {
//                 console.log("Error getting document:", error)
//             });
//         let body = ''
//         if (data.order_status.key == 2) {
//             body = `Your order have been confirmed`
//             data.items.forEach(async (m: any) => {
//                 const increment = admin.firestore.FieldValue.increment(-m.totalQty);
//                 const update = {
//                     totalQty: increment
//                 }
//                 await db.collection('products').doc(m.item.key).update(update).then((success: any) => {
//                     console.log('success', success)
//                 }).catch((err: any) => {
//                     console.log('err', err)
//                 })
//             });
//         } else if (data.order_status.key == 3) {
//             body = `Your order have been delivery`
//         } else if (data.order_status.key == 4) {
//             body = `Your order have been completed.Thank for your!`
//         } else if (data.order_status.key == 5) {
//             body = `Your order have been returned!`
//             data.items.forEach(async (m: any) => {
//                 const increment = admin.firestore.FieldValue.increment(+m.totalQty);
//                 const update = {
//                     totalQty: increment
//                 }
//                 await db.collection('products').doc(m.item.key).update(update).then((success: any) => {
//                     console.log('success', success)
//                 }).catch((err: any) => {
//                     console.log('err', err)
//                 })
//             });
//         }
//         else if (data.order_status.key == 6) {
//             body = `Product out off stock. Sorry your product order have been cancelled`
//         }
//         const message = {
//             notification: {
//                 title: `${data.order_status.name} Order`,
//                 body: body,
//                 sound: 'default',
//                 badge: badge,
//             },
//             data: {
//                 title: `${data.order_status.name} Order`,
//                 body: body,
//             }

//         }
//         const option = {
//             priority: "high",
//             timeToLive: 60 * 60 * 24

//         }
//         admin
//             .messaging()
//             .sendToDevice(tokens, message, option)
//             .then(response => {
//             })
//             .catch(error => {
//             });

//     }else{
//         const uid = data.user.id;
//         const items: any = await db
//             .collection('customer')
//             .doc(uid)
//             .collection("fcmToken")
//             .get().then((doc: any) => {
//                 const item = pushToArray(doc)
//                 return item
//             }).catch(function (error) {
//                 console.log("Error getting document:", error)
//             });
//         items.forEach((result: any) => {
//             const token: any = result.key
//             tokens.push(token)
//         });
//         const increment = admin.firestore.FieldValue.increment(1);
//         const update = {
//             badge: increment
//         }
//         await db.collection('customer').doc(uid).update(update)
//         await db.collection('customer').doc(uid).collection('orders').doc(data.key).update(data)
//         //  await db.collection('store_account').doc(store).collection('storeOrder').doc(data.key).update(data)
//         function createId() {
//             return db.collection('customer').doc().id;
//         }
//         const cover: any = await data.items.map((m: any) => {
//             return m.item.cover
//         })
//         const dataSubmit: any = {
//             key: createId(),
//             page_key: Number(new Date()),
//             date_create: new Date(),
//             user: data.user.fullName,
//             user_contact: data.user.phone,
//             items_cover: cover,
//             order_key: data.key,
//             status: data.order_status,
//             name: "New Order",
//         }
//         await db.collection('customer').doc(uid).collection('notification').doc(dataSubmit.key).set(dataSubmit)
//         const badge: any = await db
//             .collection('customer')
//             .doc(uid)
//             .get().then((doc: any) => {
//                 const item: any = pushToObject(doc)
//                 const data = item.badge ? item.badge : 1
//                 return String(data)
//             }).catch(function (error) {
//                 console.log("Error getting document:", error)
//             });
//         let body = ''
//         if (data.order_status.key == 2) {
//             body = `Your order have been confirmed`
//             data.items.forEach(async (m: any) => {
//                 const increment = admin.firestore.FieldValue.increment(-m.totalQty);
//                 const update = {
//                     totalQty: increment
//                 }
//                 await db.collection('store_account').doc(store).collection('products').doc(m.item.key).update(update).then((success: any) => {
//                     console.log('success', success)
//                 }).catch((err: any) => {
//                     console.log('err', err)
//                 })
//             });
//         } else if (data.order_status.key == 3) {
//             body = `Your order have been delivery`
//         } else if (data.order_status.key == 4) {
//             body = `Your order have been completed.Thank for your!`
//         } else if (data.order_status.key == 5) {
//             body = `Your order have been returned!`
//             data.items.forEach(async (m: any) => {
//                 const increment = admin.firestore.FieldValue.increment(+m.totalQty);
//                 const update = {
//                     totalQty: increment
//                 }
//                await db.collection('store_account').doc(store).collection('products').doc(m.item.key).update(update).then((success: any) => {
//                     console.log('success', success)
//                 }).catch((err: any) => {
//                     console.log('err', err)
//                 })
//             });
//         }
//         else if (data.order_status.key == 6) {
//             body = `Product out off stock. Sorry your product order have been cancelled`
//         }
//         const message = {
//             notification: {
//                 title: `${data.order_status.name} Order`,
//                 body: body,
//                 sound: 'default',
//                 badge: badge,
//             },
//             data: {
//                 title: `${data.order_status.name} Order`,
//                 body: body,
//             }

//         }
//         const option = {
//             priority: "high",
//             timeToLive: 60 * 60 * 24

//         }
//         admin
//             .messaging()
//             .sendToDevice(tokens, message, option)
//             .then(response => {
//             })
//             .catch(error => {
//             });

//     }

// }

