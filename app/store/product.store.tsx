import { action, observable } from 'mobx';
import { storeRef, productRef, categoryRef, createId, subCategoryRef } from '../services/data.service';
import { pushToArray, pushToObject } from '../services/mapping.service';
import { STORE_CONFIG } from '../dummy/config';
import { Alert } from 'react-native';
import { IProduct } from '../interface/product.interface';
import { storageRef } from '../services/storage.service';
import firebase from 'react-native-firebase';

export default class Product {
	@observable data: Array<any> = [];
	@observable loading: boolean = true;
	@observable process: boolean = false;
	@observable refresh: boolean = false;
	@observable fetching: boolean = false;
	@observable loadingProduct: boolean = false;
	lastVisible: any = null;

	//for add product
	@observable category: any = null;
	@observable subCategory: any = null;
	@observable color: Array<any> = [];
	@observable material: Array<any> = [];
	@observable size: Array<any> = [];
	@observable style: Array<any> = [];
	@observable grade: Array<any> = [];
	@observable dataSelectedProduct: any = null;
	//

	@action
	clearData() {
		this.category = null;
		this.subCategory = null;
		this.color = [];
		this.material = [];
		this.size = [];
		this.style = [];
		this.grade = [];
		this.dataSelectedProduct = [];
	}

	@action
	addVariant(val: any, type: string) {
		switch (type) {
			case 'SIZE':
				const list = this.color.filter((m) => m && m === val);
				if (list.length > 0) {
					Alert.alert('Selection Size', 'Size is already exist in list. Please try another.');
					return;
				}
				this.size = this.size.concat([ val ]);
				break;
			case 'STYLE':
				const list2 = this.color.filter((m) => m && m === val);
				if (list2.length > 0) {
					Alert.alert('Selection Style', 'Style is already exist in list. Please try another.');
					return;
				}
				this.style = this.style.concat([ val ]);
				break;
			case 'MATERIAL':
				const list3 = this.color.filter((m) => m && m === val);
				if (list3.length > 0) {
					Alert.alert('Selection Material', 'Material is already exist in list. Please try another.');
					return;
				}
				this.material = this.material.concat([ val ]);
				break;
			default:
				const list4 = this.color.filter((m) => m && m === val);
				if (list4.length > 0) {
					Alert.alert('Selection Grade', 'Grade is already exist in list. Please try another.');
					return;
				}
				this.grade = this.grade.concat([ val ]);
				break;
		}
	}

	@action
	removeVariant(val: any, type: string) {
		switch (type) {
			case 'SIZE':
				const list = this.size.filter((m) => m && m != val);
				this.size = list;
				break;
			case 'STYLE':
				const list1 = this.style.filter((m) => m && m != val);
				this.style = list1;
				break;
			case 'MATERIAL':
				const list2 = this.material.filter((m) => m && m != val);
				this.material = list2;
				break;
			default:
				const list3 = this.grade.filter((m) => m && m != val);
				this.grade = list3;
				break;
		}
	}

	@action
	addColor(code: any) {
		const list = this.color.filter((m) => m && m === code);
		if (list.length > 0) {
			Alert.alert('Choose Color', 'Color is already exist in list. Please try another.');
			return;
		}
		const item = [ code ];
		this.color = this.color.concat(item);
	}

	@action
	removeColor(item: any) {
		const list = this.color.filter((m) => m && m != item);
		this.color = list;
	}

	@action
	selectedCategory(item: any) {
		this.subCategory = item;
	}

	@action
	async fetchCategory() {
		const docs = await categoryRef().orderBy('name').get();
		return pushToArray(docs);
	}

	@action
	async fetchStoreCategory(store: any) {
		let docs: any = await storeRef().doc(store).get().catch((error) => {
			console.log('error', error);
		});
		let item: any = [];
		docs = await pushToObject(docs);
		docs.department.map((i: any) => {
			const { categories }: any = i;
			categories.map((j: any) => {
				j.departmentKey = i.key;
			});
			item = item.concat(...categories);
		});
		return item;
	}

	async getData() {
		await productRef().orderBy('page_key', 'DESC').onSnapshot((item) => {
			const items = pushToArray(item);
			this.lastVisible = item.size >= STORE_CONFIG.SIZE ? items[item.size - 1] : null;
			this.data = items;
		});
	}

	@action
	async fetchData() {
		this.loading = true;
		await this.getData();
		this.loading = false;
	}

	@action
	async fetchRefresh() {
		this.refresh = true;
		await this.getData();
		this.refresh = false;
	}

	@action
	async fetchMore() {
		if (this.fetching || !this.lastVisible) return;
		const { page_key } = this.lastVisible;
		this.fetching = true;
		const docs = await productRef().orderBy('page_key').startAt(page_key).get();
		const items = pushToArray(docs);
		this.lastVisible = docs.size >= STORE_CONFIG.SIZE ? items[docs.size - 1] : null;
		this.data = items;
		this.fetching = false;
	}

	@action
	async AddProduct(item: IProduct, callback: any) {
		this.process = true;
		await productRef()
			.doc(item.key)
			.set(item)
			.then((res) => {
				this.color = [];
				this.size = [];
				this.material = [];
				this.style = [];
				this.grade = [];
				this.category = null;
				this.process = false;
				callback(true, res);
			})
			.catch((error) => {
				this.process = false;
				Alert.alert('Error', error);
				console.log(false, error);
			});
	}

	@action
	async uploadPhoto(uid: string, path: any, callback: any) {
		this.process = true;
		const filePath = `product/${uid}/${uid}`;
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
	async deleteProduct(uid: any) {
		productRef()
			.doc(uid)
			.delete()
			.then((item: any) => {
				Alert.alert('Product Delete Successfully');
			})
			.catch((error) => {
				Alert.alert('error', error);
			});
	}

	@action
	async fetchSelectedProduct(item: any) {
		this.loadingProduct = true;
		const subCategory = await this.getFromRef(item.subCategoryRef);
		const category = await this.getFromRef(item.categoryRef);
		this.dataSelectedProduct = {
			...item,
			category,
			subCategory
		};
		this.loadingProduct = false;
	}

	@action
	async getSelectedProduct(key: any, callback: any) {
		productRef().doc(key).onSnapshot((item) => {
			this.dataSelectedProduct = pushToObject(item);
			callback(this.dataSelectedProduct);
		});
	}

	@action
	async getFromRef(ref: any) {
		const data = await ref.get();
		return data ? pushToObject(data) : null;
	}

	@action
	updateProduct(item: any, callback: any) {
		this.process = true;
		productRef()
			.doc(item.key)
			.update(item)
			.then(() => {
				callback(true);
				this.process = false;
			})
			.catch((error: any) => {
				console.log('error', error);
				this.process = false;
			});
	}

	@action
	async onSaveGallery(images: any, item: any) {
		this.loadingProduct = true;
		for (let i = 0; i < images.length; i++) {
			const key = createId();
			await this.uploadGallery(key, images[i].img, (res: any) => {
				productRef().doc(item.key).update({
					gallery: firebase.firestore.FieldValue.arrayUnion({
						key: key,
						img: res
					})
				});
			}).catch((error) => {
				console.log('error', error);
			});
		}

		this.loadingProduct = false;
	}

	@action
	async uploadGallery(uid: string, path: any, callback: any) {
		this.process = true;
		const filePath = `product/gallery/${uid}`;
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
	async deleteGallery(img: string) {
		await storageRef()
			.refFromURL(img)
			.delete()
			.then(() => {
				console.log('delete file success');
			})
			.catch((error) => {
				console.log('error', error);
			});
	}

	@action
	removeGallery(image: any, item: any) {
		this.loadingProduct = true;
		productRef()
			.doc(item.key)
			.update({ gallery: firebase.firestore.FieldValue.arrayRemove(image) })
			.then(() => {
				this.deleteGallery(image.img);
				this.loadingProduct = false;
			})
			.catch((error) => {
				console.log('error', error);
			});
	}
}
