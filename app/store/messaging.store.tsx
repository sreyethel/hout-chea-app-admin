import { action, } from "mobx";
import { notificationsRef, initialMessaging } from "../services/messaging.service";
import firebase from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';
import { batchRef, createId, userRef } from "../services/data.service";
import { fieldArrayValue, userObject } from "../services/mapping.service";

export default class Messaging {
  notificationOpen: any = null;
  notificationOpenedListener: any = null;
  notificationListener: any = null;
  messageListener: any = null;
  fcmToken: any = null;

  @action
  async checkPermission() {
    this.fcmToken = await initialMessaging();
  }

  @action
  async setUserToken(user: any) {
    const { key, token } = user;
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        const data = fieldArrayValue(token, fcmToken);
        if (data) {
          const batch = batchRef();
          const keyDevice = createId();
          batch.update(userRef().doc(key), { token: data })
          batch.set(userRef().doc(key).collection("devices").doc(`${keyDevice}`), {
            key: keyDevice,
            token: fcmToken,
            create_by: userObject(user),
            create_date: new Date()
          });
          batch.commit();
        }
      }
    }
  }

  @action
  async initialNotification() {
    this.notificationListener = notificationsRef().onNotification((notification) => {
      const { title, body } = notification;
      console.log(notification)
      this.showNotification(title, body);
    });
    this.notificationOpenedListener = notificationsRef().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log(notificationOpen.notification)
      this.showNotification(title, body);
    });
    const notificationOpen = await notificationsRef().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log(notificationOpen.notification)
      this.showNotification(title, body);
    }
    firebase.messaging().subscribeToTopic("HoutChea");
    this.messageListener = firebase.messaging().onMessage((message) => {
      const { title, body } = message;
      this.showNotification(title, body);
      console.log(message);
    });
  }

  @action
  showNotification(title: string, body: string) {
    const notification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle('HoutChea')
      .setBody('Confirm code')
      .setData({
        key1: 'value1',
        key2: 'value2',
      });
    firebase.notifications().displayNotification(notification)
  }

  @action
  stopListener() {
    if (this.notificationOpenedListener) this.notificationOpenedListener();
    if (this.notificationListener) this.notificationListener();
    if (this.notificationOpen) this.notificationOpen();
    if (this.messageListener) this.messageListener()
  }

}
