import { observable, action, toJS } from 'mobx';
import { locationRef, geoPoint, storeAccountRef } from '../services/data.service';
import { pushToArray } from '../services/mapping.service';
import { pushToObject } from '../../functions/src/app/userNoti';

export default class LocationStore {
	@observable dataLocation: Array<any> = [];
	@observable loading: boolean = false;
	@observable storeLocation: any = null;
	@observable coords: any = {

	};

	@action
	toJs(item: any) {
		return toJS(item);
	}

	@action
	addGeoPoint(latitude: number, longitude: number) {
		return geoPoint(latitude, longitude);
	}

	@action
	fetchLocation() {
		this.loading = true;
		locationRef().onSnapshot((item) => {
			this.dataLocation = pushToArray(item);
			this.loading = false;
		});
	}
	@action
	fetchStoreLocation(store: any) {
		this.loading = true;
		storeAccountRef().doc(store.key).onSnapshot((item: any) => {
			this.storeLocation = pushToObject(item);
			this.loading = false;
		});
	}


	@action
	saveLocation(item: any) {
		this.loading = true;
		locationRef()
			.doc(item.key)
			.set(item)
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
			});
	}

	@action
	deleteLocation(item: any) {
		this.loading = true;
		locationRef()
			.doc(item.key)
			.delete()
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
			});
	}

	@action
	updateLocation(item: any) {
		this.loading = true;
		locationRef()
			.doc(item.key)
			.update(item)
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
			});
	}

	@action
	clearAll() {
		this.coords = {};
	}
}
