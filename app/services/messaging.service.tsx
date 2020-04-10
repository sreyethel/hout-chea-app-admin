import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'

export async function initialMessaging() {
  const enabled = await firebase.messaging().hasPermission()
  if (enabled) {
    return await getToken()
  } else {
    try {
      return await firebase.messaging().requestPermission()
    } catch (error) { }
  }
}


export async function getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken)
    }
  }
}

export function notificationsRef() {
  return firebase.notifications();
}