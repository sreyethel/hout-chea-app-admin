import { action, observable } from 'mobx';
import { notificationsRef, initialMessaging } from '../services/messaging.service';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { NotificationOpen } from 'react-native-firebase/notifications'
import { storeRef, storeAccountRef } from '../services/data.service';

export default class MessagingStore {
	notificationOpen: any = null;
	notificationOpenedListener: any = null;
	notificationListener: any = null;
	notificationListenerDisplay: any = null;
	messageListener: any = null;
	fcmToken: any = '';
	@observable key: any = null
	@observable openNoti: boolean = false
	@observable title: string = ''
	@observable body: string = ''

	@action
	async checkPermission() {
		this.fcmToken = await initialMessaging();
	}

	@action
	async setUserToken(store: any) {
		let fcmToken: any = await AsyncStorage.getItem('fcmToken');
		if (!fcmToken) {
			fcmToken = await firebase.messaging().getToken();
			if (fcmToken) {
				const mainToken = fcmToken
				await AsyncStorage.setItem('fcmToken', mainToken);
			}
		}
		const item = {
			key: fcmToken,
			name: 'fcmToken'
		}
		if (store.isAdmin == true) {
			await storeRef().doc('gcz7Zu6VOZnoc0XiSvNH').collection("fcmToken").doc(fcmToken).set(item)
		} else {
			await storeAccountRef().doc(store.key).collection("fcmToken").doc(fcmToken).set(item)
		}

	}

	@action
	async initialNotification(navigation: any) {
		this.notificationOpenedListener = notificationsRef().onNotificationOpened((notificationOpen) => {
			const { data } = notificationOpen.notification;
			navigation.navigate('NOTI')
		});
		this.notificationListener = await notificationsRef().getInitialNotification().then((notificationOpen: NotificationOpen) => {
			if (notificationOpen) {
				const { data } = notificationOpen.notification;
				navigation.navigate('NOTI')
			}
		});

		this.messageListener = firebase.messaging().onMessage((message) => {
			const { data } = message;
			this.showNotification(data)

		});
	}

	@action
	showNotification(data: any) {
		const { title, body, key } = data;
		const notification = new firebase.notifications.Notification()
			.setNotificationId('notificationId')
			.setTitle(title)
			.setBody(body)
			.setData({
				key: key,
				title: title,

			});
		firebase.notifications().displayNotification(notification);
	}
	@action
	stopListener() {
		if (this.notificationOpenedListener) this.notificationOpenedListener();
		if (this.notificationListener) this.notificationListener();
		if (this.notificationOpen) this.notificationOpen();
		if (this.messageListener) this.messageListener();
	}
}