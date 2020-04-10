import { action, observable } from 'mobx';
import { createId, categoryRef, subCategoryRef } from '../services/data.service';
import { pushToArray, pushToObject } from '../services/mapping.service';
import { storageRef } from '../services/storage.service';

export default class CategoryStor {
	@observable loading: boolean = true;
	@observable process: boolean = true;
	@observable dataCategory: Array<any> = [];
	@observable dataSubCategory: Array<any> = [];

	@observable dataSelectedCategory: any = null;

	@action
	async deleteCategory(item: any) {
		this.process = true;
		await subCategoryRef()
			.where('category.key', '==', item.key)
			.get()
			.then((item) => {
				item.forEach((docs: any) => {
					docs.ref.delete();
					const data: any = pushToObject(docs);
					data.fileUrl ? this.deleteFile(data.fileUrl) : null;
				});
			})
			.catch((error) => {
				console.log('error', error);
			});
		await categoryRef().doc(item.key).delete().then(() => {
			this.process = false;
		});
		item.fileUrl ? this.deleteFile(item.fileUrl) : null;
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
	async deleteSubCategory(item: any) {
		this.process = true;
		await subCategoryRef()
			.doc(item.key)
			.delete()
			.then(() => {
				this.process = false;
			})
			.catch((error) => {
				console.log('error', error);
			});
		item.fileUrl ? this.deleteFile(item.fileUrl) : null;
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
				// console.log('e', e)
				callback(null);
			});
	}

	@action
	fetchCategory() {
		this.loading = true;
		categoryRef().onSnapshot((item: any) => {
			this.dataCategory = pushToArray(item);
			this.loading = false;
		});
	}

	@action
	saveSubCategory(item: any) {
		this.loading = true;
		subCategoryRef().doc(item.key).set(item).then(() => {
			this.loading = false;
		});
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
				// console.log('e', e)
				callback(null);
			});
	}

	@action
	async fetchSubCategory(key?: any, callback?: any) {
		this.loading = true;
		if (key) {
			await subCategoryRef().where('categoryKey', '==', key).onSnapshot((item: any) => {
				this.dataSubCategory = [];
				this.dataSubCategory = pushToArray(item);
				this.loading = false;
			});
		} else {
			await subCategoryRef().onSnapshot((item: any) => {
				this.dataSubCategory = [];
				this.dataSubCategory = pushToArray(item);
				this.loading = false;
				callback(this.dataSubCategory);
			});
		}
	}

	@action
	fetchSelectedCategory(key: string) {
		this.loading = true;
		categoryRef().doc(key).onSnapshot((item) => {
			this.dataSelectedCategory = pushToObject(item);
			console.log('this.dataSelectedCategory', this.dataSelectedCategory);
			this.loading = false;
		});
	}

	@action
	updateCategory(item: any) {
		categoryRef().doc(item.key).update(item).catch((error) => {
			console.log('error', error);
		});
	}

	@action
	updateSubCategory(item: any) {
		subCategoryRef().doc(item.key).update(item).catch((error) => {
			console.log('error', error);
		});
	}
}
