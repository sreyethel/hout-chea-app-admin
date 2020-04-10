import { observable, action } from 'mobx';
import { environmentRef } from '../services/data.service';
import DeviceInfo from 'react-native-device-info';
import { Platform, Alert, Linking, BackHandler } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { pushToArray } from '../services/mapping.service';

export default class versionStore {
	@observable dataVersion: any = null;

	@action
	fetchVersion() {
		environmentRef().onSnapshot((item: any) => {
			const docs = pushToArray(item);
			this.dataVersion = docs[0];
			console.log('this.dataVersion', this.dataVersion);

			let version = DeviceInfo.getVersion();

			console.log('dataVersion', this.dataVersion.version_android_client);
			console.log('version', version);

			if (this.dataVersion.isMaintenance) {
				Alert.alert(
					'App Under Maintenance',
					'Sorry for our app is currently under maintenance',
					[
						{
							text: 'Exit',
							onPress: () => (Platform.OS == 'ios' ? RNExitApp.exitApp() : BackHandler.exitApp())
						}
					],
					{ cancelable: false }
				);
			}

			if (Platform.OS == 'ios') {
				if (this.dataVersion.version_ios_seller != version) {
					Alert.alert(
						'Update Available',
						'Please update your App',
						[
							{
								text: 'Go to Store',
								onPress: () =>
									Linking.openURL(
										'https://apps.apple.com/kh/app/onlinget-seller/id1488867608'
									).catch((err) => console.error('An error occurred', err))
							}
						],
						{ cancelable: false }
					);
				}
			}
			if (Platform.OS == 'android') {
				if (this.dataVersion.version_android_seller != version) {
					Alert.alert(
						'Update Available',
						'Please update your App',
						[
							{
								text: 'Go to Store',
								onPress: () =>
									Linking.openURL(
										'https://play.google.com/store/apps/details?id=com.onlineget.OnlineGetSeller&hl=en_ZA'
									).catch((err) => console.error('An error occurred', err))
							}
						],
						{ cancelable: false }
					);
				}
			}
		});
	}
}
