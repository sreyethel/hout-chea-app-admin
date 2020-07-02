import { observable, action } from "mobx";
import { firestore, storeRef, storeAccountRef } from "../services/data.service";
import { pushToArray, pushToObject } from "../services/mapping.service";
const batch = firestore().batch();

export default class TransactionStore {
    @observable badge: number = 0
    @observable notiDoc: any = [];
    @observable loadingNoti: boolean = true;
    @action
    fetchBadge(store: any, userCanActive: any) {
        if (userCanActive) {
            storeRef()
                .doc(store.key)
                .onSnapshot(async (item: any) => {
                    const doc: any = await pushToObject(item)
                    this.badge = doc.badge
                })
        } else {
            storeAccountRef()
                .doc(store.key)
                .onSnapshot(async (item: any) => {
                    const doc: any = await pushToObject(item)
                    this.badge = doc.badge
                })
        }

    }
    @action
    async  clearBadge(store: any,userCanActive:any) {
        const update = {
            badge: 0
        }
        if (userCanActive) {
            await storeRef().doc('gcz7Zu6VOZnoc0XiSvNH').update(update)
        } else {
            await storeAccountRef().doc(store.key).update(update)
        }

    }

    @action
    fetchNoti(profile: any, userCanActive: any) {
        if (userCanActive) {
            storeRef()
                .doc("gcz7Zu6VOZnoc0XiSvNH")
                .collection('notification')
                .orderBy("page_key", "DESC")
                .limit(100)
                .get().then((item: any) => {
                    const doc = pushToArray(item)
                    this.notiDoc = doc
                    this.loadingNoti = false
                })
        } else {
            storeAccountRef()
                .doc(profile.key)
                .collection('notification')
                .orderBy("page_key", "DESC")
                .limit(100)
                .get().then((item: any) => {
                    const doc = pushToArray(item)
                    this.notiDoc = doc
                    this.loadingNoti = false
                })
        }
        this.loadingNoti = false
    }
}