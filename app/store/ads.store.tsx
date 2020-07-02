import { action, observable } from 'mobx';
import { bannerRef, createId, promotionRef, posterRef, firestore, productRef } from '../services/data.service';
import { storageRef } from '../services/storage.service';
import { pushToArray, StatusObject } from '../services/mapping.service';
import firebase from 'react-native-firebase';

export default class AdsStore {
	@observable loading: boolean = false;
	@observable process: boolean = false;
	@observable dataBanner: Array<any> = [];
	@observable dataPromotion: Array<any> = [];
	@observable dataPoster: Array<any> = [];

	@action
	saveBanner(item: any) {
		this.loading = true;
		bannerRef()
			.doc(item.key)
			.set(item)
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
			});
	}

	@action
	async uploadPhoto(path: any, callback: any) {
		this.process = true;
		const key = createId();
		const filePath = `banners/${key}/`;
		await storageRef()
			.ref(filePath)
			.putFile(path)
			.then(async (url: any) => {
				const { downloadURL } = url;
				callback(downloadURL);
				this.process = false;
			})
			.catch((e: any) => {
				callback(null);
			});
	}

	@action
	fetchBanner() {
		this.loading = true;
		bannerRef()
			.where("status.key", "==", 1)
			.orderBy('index', 'ASC')
			.onSnapshot((item) => {
				this.dataBanner = pushToArray(item);
				this.loading = false;
			});
	}

	@action
	deleteBanner(user: any, key: string) {
		this.loading = true;
		const item = {
			status: StatusObject().DELETED,
			deleted_by: user,
			deleted_date: new Date(),
		}
		bannerRef()
			.doc(key)
			.update(item)
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
			});
	}

	@action
	deleteFile(url: any) {
		storageRef()
			.refFromURL(url)
			.delete()
			.then(() => {
			})
			.catch((error) => {
			});
	}

	@action
	EditBanner(item: any) {
		this.process = true;
		bannerRef()
			.doc(item.key)
			.update(item)
			.then(() => {
				this.process = false;
			})
			.catch((error) => console.log('error', error));
	}

	@action
	savePromotion(item: any, callback: any) {
		this.loading = true;
		const batch = firestore().batch();
		batch.set(promotionRef()
			.doc(item.key), item)
		const increment = firebase.firestore.FieldValue.increment(-item.totalQty);
		const update = {
			totalQty: increment
		}
		batch.update(productRef()
			.doc(item.key), update)
		batch
			.commit()
			.then(() => {
				this.loading = false;
				callback(true);
			})
			.catch((error: any) => {
				this.loading = false;
				callback(false);
			});

	}

	@action
	async uploadPromotionPhoto(path: any, callback: any) {
		this.process = true;
		const key = createId();
		const filePath = `promotions/${key}/`;
		await storageRef()
			.ref(filePath)
			.putFile(path)
			.then(async (url: any) => {
				const { downloadURL } = url;
				callback(downloadURL);
				this.process = false;
			})
			.catch((e: any) => {
				callback(null);
			});
	}

	@action
	fetchPromotion() {
		this.loading = true;
		promotionRef()
			.where("status.key", "==", 1)
			.orderBy('promotion_create_date_key', 'DESC')
			.onSnapshot((item) => {
				this.dataPromotion = pushToArray(item);
				this.loading = false;
			});
	}

	@action
	deletePromotion(user: any, item: any, callback: any) {
		this.loading = true;
		const batch = firestore().batch();
		const doc = {
			status: StatusObject().DELETED,
			deleted_by: user,
			deleted_date: new Date(),
		}
		batch.set(promotionRef()
			.doc(item.key)
			, doc)
		const increment = firebase.firestore.FieldValue.increment(+item.totalQty);
		const update = {
			totalQty: increment
		}
		batch.update(productRef()
			.doc(item.key), update)
		batch
			.commit()
			.then(() => {
				this.loading = false;
				callback(true);
			})
			.catch((error: any) => {
				this.loading = false;
				callback(false);
			});

	}

	@action
	EditPromotion(item: any, cb: any) {
		this.process = true;
		promotionRef()
			.doc(item.key)
			.update(item)
			.then(() => {
				this.process = false;
				return cb(true)
			})
			.catch((error) => {
				return cb(false)
			}
			);
	}

	@action
	savePoster(item: any) {
		this.loading = true;
		posterRef()
			.doc(item.key)
			.set(item)
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
			});
	}

	@action
	async uploadPosterPhoto(path: any, callback: any) {
		this.process = true;
		const key = createId();
		const filePath = `posters/${key}/`;
		await storageRef()
			.ref(filePath)
			.putFile(path)
			.then(async (url: any) => {
				const { downloadURL } = url;
				callback(downloadURL);
				this.process = false;
			})
			.catch((e: any) => {
				callback(null);
			});
	}

	@action
	fetchPoster() {
		this.loading = true;
		posterRef()
			.where("status.key", "==", 1)
			.orderBy('index', 'ASC').onSnapshot((item) => {
				this.dataPoster = pushToArray(item);
				this.loading = false;
			});
	}

	@action
	deletePoster(user: any, key: string) {
		this.loading = true;
		const item = {
			status: StatusObject().DELETED,
			deleted_by: user,
			deleted_date: new Date(),
		}
		posterRef()
			.doc(key)
			.update(item)
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
			});
	}

	@action
	EditPoster(item: any) {
		this.process = true;
		posterRef()
			.doc(item.key)
			.update(item)
			.then(() => {
				this.process = false;
			})
			.catch((error) => console.log('error', error));
	}
}
