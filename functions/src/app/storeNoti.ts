import * as admin from "firebase-admin";
export async function pushToArray(data: admin.firestore.QuerySnapshot) {
    if (data.empty) return null;
    return data.docs.map(m => { return { ...m.data() } })
}
export function pushToObject(snapshot: admin.firestore.DocumentSnapshot) {
    return { ...snapshot.data(), id: snapshot.id }
}
export async function storeNotiOnOrder(data: any, context: any) {
    console.log('data', data)
    // const db = admin.firestore()
    // let tokens: any = []
    // const store: any = data.name
    // if (store == "adminstore") {
    //     const uid = 'gcz7Zu6VOZnoc0XiSvNH';
    //     const items: any = await db
    //         .collection('store')
    //         .doc(uid)
    //         .collection("fcmToken")
    //         .get().then((doc: any) => {
    //             const item = pushToArray(doc)
    //             return item
    //         }).catch(function (error) {
    //             console.log("Error getting document:", error)
    //         });
    //     items.forEach((result: any) => {
    //         const token: any = result.key
    //         tokens.push(token)
    //     });
    //     const description = `You got new order Products`
    //     function createId() {
    //         return db.collection('products').doc().id;
    //     }
    //     const cover: any = await data.items.map((m: any) => {
    //         return m.item.cover
    //     })
    //     const item_names: any = await data.items.map((m: any) => {
    //         return m.item.name
    //     })
    //     const dataNoti: any = {
    //         key: createId(),
    //         page_key: Number(new Date()),
    //         date_create: new Date(),
    //         user: data.user.fullName,
    //         user_contact: data.user.phone,
    //         items_cover: cover,
    //         items_name: item_names,
    //         order_key: data.key,
    //         status: data.order_status,
    //         name: "New Order",
    //         description: description
    //     }
    //     await db.collection('customer').doc(data.user.key).collection('orders').doc(data.key).set(data)
    //     await db.collection('store').doc(uid).collection('storeOrder').doc(data.key).set(data)
    //     await db.collection('store').doc(uid).collection('notification').doc(dataNoti.key).set(dataNoti).then((item) => {
    //         console.log('item', item)
    //     }).catch((err) => {
    //         console.log('err', err)
    //     })
    //     const increment = admin.firestore.FieldValue.increment(1);
    //     const update = {
    //         badge: increment
    //     }
    //     await db.collection('store').doc(uid).update(update)
    //     const badge: any = await db
    //         .collection('store')
    //         .doc(uid)
    //         .get().then((doc: any) => {
    //             const item: any = pushToObject(doc)
    //             const data = item.badge ? item.badge : 1
    //             return String(data)
    //         }).catch(function (error) {
    //             console.log("Error getting document:", error)
    //         });
    //     const message = {
    //         notification: {
    //             title: 'New Order',
    //             body: description,
    //             badge: badge,
    //             sound: 'default',
    //         },
    //         data: {
    //             title: 'New Order',
    //             body: description,
    //         }
    //     }
    //     admin
    //         .messaging()
    //         .sendToDevice(tokens, message)
    //         .then(response => {
    //             console.log('response', response)
    //             console.log('tokens', tokens)
    //         })
    //         .catch(error => {
    //             console.log('error', error)
    //         });
    // } else {
    //     const uid = store;
    //     const items: any = await db
    //         .collection('store_account')
    //         .doc(uid)
    //         .collection("fcmToken")
    //         .get().then((doc: any) => {
    //             const item = pushToArray(doc)
    //             return item
    //         }).catch(function (error) {
    //             console.log("Error getting document:", error)
    //         });
    //     items.forEach((result: any) => {
    //         const token: any = result.key
    //         tokens.push(token)
    //     });
    //     const description = `You got new order Products`
    //     function createId() {
    //         return db.collection('products').doc().id;
    //     }
    //     const cover: any = await data.items.map((m: any) => {
    //         return m.item.cover
    //     })
    //     const item_names: any = await data.items.map((m: any) => {
    //         return m.item.name
    //     })
    //     const dataNoti: any = {
    //         key: createId(),
    //         page_key: Number(new Date()),
    //         date_create: new Date(),
    //         user: data.user.fullName,
    //         user_contact: data.user.phone,
    //         items_cover: cover,
    //         items_name: item_names,
    //         order_key: data.key,
    //         status: data.order_status,
    //         name: "New Order",
    //         description: description
    //     }
    //     await db.collection('customer').doc(data.user.key).collection('orders').doc(data.key).set(data)
    //     await db.collection('store_account').doc(uid).collection('storeOrder').doc(data.key).set(data)
    //     await db.collection('store_account').doc(uid).collection('notification').doc(dataNoti.key).set(dataNoti).then((item) => {
    //         console.log('item', item)
    //     }).catch((err) => {
    //         console.log('err', err)
    //     })
    //     const increment = admin.firestore.FieldValue.increment(1);
    //     const update = {
    //         badge: increment
    //     }
    //     await db.collection('store_account').doc(uid).update(update)
    //     const badge: any = await db
    //         .collection('store_account')
    //         .doc(uid)
    //         .get().then((doc: any) => {
    //             const item: any = pushToObject(doc)
    //             const data = item.badge ? item.badge : 1
    //             return String(data)
    //         }).catch(function (error) {
    //             console.log("Error getting document:", error)
    //         });
    //     const message = {
    //         notification: {
    //             title: 'New Order',
    //             body: description,
    //             badge: badge,
    //             sound: 'default',
    //         },
    //         data: {
    //             title: 'New Order',
    //             body: description,
    //         }
    //     }
    //     admin
    //         .messaging()
    //         .sendToDevice(tokens, message)
    //         .then(response => {
    //             console.log('response', response)
    //         })
    //         .catch(error => {
    //             console.log('error', error)
    //         });
    // }
}

