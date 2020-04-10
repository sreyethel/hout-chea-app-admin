import { observable, action, toJS } from 'mobx';
import { locationRef, geoPoint } from '../services/data.service';
import { pushToArray } from '../services/mapping.service';

export default class LocationStore {
	@observable dataLocation: Array<any> = [];
	@observable loading: boolean = false;

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
	saveLocation(item: any) {
		this.loading = true;
		locationRef()
			.doc(item.key)
			.set(item)
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
				console.log('error', error);
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
				console.log('error', error);
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
				console.log('error', error);
			});
	}

	@action
	clearAll() {
		this.coords = {};
	}
}
