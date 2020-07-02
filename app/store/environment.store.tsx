import { action, observable } from 'mobx';
import { environmentRef } from '../services/data.service';
import { pushToArray, pushToObject } from '../services/mapping.service';
import DeviceInfo from 'react-native-device-info';
import { Platform, Alert } from 'react-native';
export default class EnvironmentStore {
	@observable dataEnvironment: any = {};
	@observable loading: boolean = true;
	@observable isUpdatediOS: boolean = false;
	@observable isUpdatedAndroid: boolean = false;

	@action
	async fetchEnvironment() {
		await environmentRef().get().then((item: any) => {
			const doc: any = pushToArray(item);
			this.dataEnvironment = doc[0];
			const version = DeviceInfo.getVersion();
			if (Platform.OS == 'ios') {
				if (version == doc[0].version_iOS_admin) {
					this.isUpdatediOS = false
				} else {
					this.isUpdatediOS = true
				}
			} else if(Platform.OS == "android") {
				if (version == doc[0].version_android_admin) {
					this.isUpdatedAndroid = false
				} else {
					this.isUpdatedAndroid = true
				}
			}
			this.loading = false;
		});

	}


}
