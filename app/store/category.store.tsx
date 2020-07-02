import { action, observable } from 'mobx';
import { createId, categoryRef, subCategoryRef, marketRef } from '../services/data.service';
import { pushToArray, pushToObject, StatusObject } from '../services/mapping.service';
import { storageRef } from '../services/storage.service';
import { Status } from '../dummy/status';

export default class CategoryStor {
	@observable loading: boolean = true;
	@observable process: boolean = true;
	@observable dataMarket: Array<any> = [];
	@observable loadingMarket: boolean = true;
	@observable dataCategory: Array<any> = [];
	@observable listCategory: Array<any> = [];
	@observable dataSubCategory: Array<any> = [];
	@observable loadingSubCategory: boolean = true;
	@observable dataSelectedCategory: any = null;
	@observable selectedCategory: any = null;



	@action
	fetchMarket() {
		this.loadingMarket = true
		const doc: any = {
			key: 'All',
			name: 'All',
		}
		marketRef().onSnapshot((item: any) => {
			const data = pushToArray(item)
			data.unshift(doc)
			this.dataMarket = data
			this.loadingMarket = false;
		})
	}
	@action
	async deleteCategory(user: any, key: string) {
		this.process = true;
		const item = {
			status: StatusObject().DELETED,
			deleted_by: user,
			deleted_date: new Date(),
		}
		await categoryRef().doc(key).update(item)
		this.process = false;

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
	async deleteSubCategory(user: any, key: any) {
		this.process = true;
		const item = {
			status: StatusObject().DELETED,
			deleted_by: user,
			deleted_date: new Date(),
		}
		await subCategoryRef()
			.doc(key)
			.update(item)
			.then(() => {
				this.process = false;
			})
			.catch((error) => {
				this.process = false;
			});
	}

	@action
	saveCategory(item: any) {
		this.loading = true;
		categoryRef().doc(item.key).set(item).then(() => {
			this.loading = false;
		});
	}

	@action
	async uploadPhoto(path: any, callback: any) {
		this.process = true;
		const key = createId();
		const filePath = `category/${key}/`;
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
	fetchCategory(key?: string) {
		this.loading = true;
		if (key) {
			categoryRef()
				.where("status.key", "==", 1)
				.onSnapshot((item: any) => {
					const doc = pushToArray(item);
					this.dataCategory = doc.filter((m: any) => { return m.market.key == key })
					const data: any = doc
					data.unshift({ key: "0", name: "ALL" })
					this.listCategory = data
					this.loading = false;
				});

		} else {
			categoryRef()
				.where("status.key", "==", 1)
				.onSnapshot((item: any) => {
					const doc = pushToArray(item);
					this.dataCategory = pushToArray(item);
					const data: any = doc
					data.unshift({ key: "0", name: "ALL" })
					this.listCategory = data
					this.loading = false;
				});
		}

	}

	@action
	saveSubCategory(item: any) {
		this.loading = true;
		subCategoryRef().doc(item.key).set(item).then(() => {
			this.loading = false;
		});
	}
	@action
	setCategory(item: any) {
		this.selectedCategory = item
	}
	@action
	async uploadSubPhoto(path: any, callback: any) {
		this.process = true;
		const key = createId();
		const filePath = `sub-category/${key}/`;
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
	async fetchSubCategory(key: any, callback: any) {
		this.loadingSubCategory = true;
		if (key) {
			await subCategoryRef()
				.where('status.key', '==', 1)
				.onSnapshot((item: any) => {
					const doc = pushToArray(item);
					this.dataSubCategory = doc.filter((m: any) => { return (m.categoryKey == key) })
					this.loadingSubCategory = false;
				});
		} else {
			await subCategoryRef().onSnapshot((item: any) => {
				this.dataSubCategory = pushToArray(item);
				this.loadingSubCategory = false;
				callback(this.dataSubCategory);
			});
		}
	}

	@action
	fetchSelectedCategory(key: string) {
		this.loading = true;
		categoryRef().doc(key).onSnapshot((item) => {
			this.dataSelectedCategory = pushToObject(item);
			this.loading = false;
		});
	}

	@action
	updateCategory(item: any, callback: any) {
		categoryRef().doc(item.key)
			.update(item)
			.then(() => {
				return callback(true)
			})
			.catch((error) => {
				return callback(false)
			});
	}

	@action
	updateSubCategory(item: any) {
		subCategoryRef().doc(item.key).update(item).catch((error) => {
		});
	}
}
