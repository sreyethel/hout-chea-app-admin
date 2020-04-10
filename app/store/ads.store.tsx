import { action, observable } from 'mobx';
import { bannerRef, createId, promotionRef, posterRef } from '../services/data.service';
import { storageRef } from '../services/storage.service';
import { pushToArray } from '../services/mapping.service';

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
				console.log('error', error);
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
				// console.log('e', e)
				callback(null);
			});
	}

	@action
	fetchBanner() {
		this.loading = true;
		bannerRef().orderBy('index', 'ASC').onSnapshot((item) => {
			this.dataBanner = pushToArray(item);
			this.loading = false;
		});
	}

	@action
	deleteBanner(item: any) {
		this.loading = true;
		item.fileUrl ? this.deleteFile(item.fileUrl) : null;
		bannerRef()
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
	deleteFile(url: any) {
		storageRef()
			.refFromURL(url)
			.delete()
			.then(() => {
				console.log('delete file success');
			})
			.catch((error) => {
				console.log('error', error);
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
	savePromotion(item: any) {
		this.loading = true;
		promotionRef()
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
				// console.log('e', e)
				callback(null);
			});
	}

	@action
	fetchPromotion() {
		this.loading = true;
		promotionRef().orderBy('index', 'ASC').onSnapshot((item) => {
			this.dataPromotion = pushToArray(item);
			this.loading = false;
		});
	}

	@action
	deletePromotion(item: any) {
		this.loading = true;
		item.fileUrl ? this.deleteFile(item.fileUrl) : null;
		promotionRef()
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
	EditPromotion(item: any) {
		console.log('item', item);
		this.process = true;
		promotionRef()
			.doc(item.key)
			.update(item)
			.then(() => {
				this.process = false;
			})
			.catch((error) => console.log('error', error));
	}

	//////Poster ///////////

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
				console.log('error', error);
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
				// console.log('e', e)
				callback(null);
			});
	}

	@action
	fetchPoster() {
		this.loading = true;
		posterRef().orderBy('index', 'ASC').onSnapshot((item) => {
			this.dataPoster = pushToArray(item);
			this.loading = false;
		});
	}

	@action
	deletePoster(item: any) {
		this.loading = true;
		item.fileUrl ? this.deleteFile(item.fileUrl) : null;
		posterRef()
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
	EditPoster(item: any) {
		console.log('item', item);
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
