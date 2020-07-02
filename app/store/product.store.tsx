import { action, observable } from 'mobx';
import { storeRef, productRef, categoryRef, createId, subCategoryRef, storeAccountRef, firestore } from '../services/data.service';
import { pushToArray, pushToObject, groupBy, StatusObject } from '../services/mapping.service';
import { STORE_CONFIG } from '../dummy/config';
import { Alert } from 'react-native';
import { IProduct } from '../interface/product.interface';
import { storageRef } from '../services/storage.service';
import firebase from 'react-native-firebase';
import _ from 'lodash'
export default class Product {
	@observable data: Array<any> = [];
	@observable loading: boolean = true;
	@observable process: boolean = false;
	@observable refresh: boolean = false;
	@observable fetching: boolean = false;
	@observable loadingProduct: boolean = false;
	lastVisible: any = null;

	@observable category: any = null;
	@observable subCategory: any = null;
	@observable dataSelectedProduct: any = null;
	@observable dataSelectedItem: any = null;
	@observable unitMeasurement: any = null
	@observable UMPrice: Array<any> = [];
	@observable varaint: Array<any> = [];
	@observable totalQty: any = null

	@action
	clearData() {
		this.UMPrice = []
		this.unitMeasurement = null;
		this.totalQty = null;
		this.category = null;
		this.subCategory = null;
		this.dataSelectedProduct = [];
		this.dataSelectedItem = null
	}


	@action
	selectedCategory(item: any) {
		this.subCategory = item;
	}

	@action
	selectedProduct(item: any) {
		this.dataSelectedItem = item;
	}
	@action
	selectedTotalQty(totalQty: any) {
		this.totalQty = totalQty

	}



	@action
	async fetchCategory() {
		const docs = await categoryRef().orderBy('name').get();
		return pushToArray(docs);
	}

	@action
	async fetchStoreCategory(store: any) {
		let docs: any = await storeRef().doc(store).get().catch((error) => {
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
		await productRef()
			.where("status.key", "==", 1)
			.orderBy('page_key', 'DESC')
			.onSnapshot((item) => {
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
				this.UMPrice = []
				this.totalQty = null;
				this.category = null;
				this.process = false;
				callback(true, res);
			})
			.catch((error) => {
				this.process = false;
				Alert.alert('Error', error);
			});
	}
	@action
	async AddStock(store: any, item: IProduct, callback: any) {
		this.process = true;
		const main = await storeAccountRef()
			.doc(store.key)
			.collection("products")
			.doc(item.key).get()
		if (main.exists) {
			Alert.alert("Product add failed!", "Product have already in stock")
			this.process = false;
			return
		}
		const batch = firestore().batch();
		const increment = firebase.firestore.FieldValue.increment(-item.totalQty);
		const update = {
			totalQty: increment
		}
		batch.set(storeAccountRef()
			.doc(store.key)
			.collection("products")
			.doc(item.key), item);

		batch.update(productRef()
			.doc(item.key), update);
		batch
			.commit()
			.then((res) => {
				this.UMPrice = []
				this.totalQty = null;
				this.category = null;
				this.varaint = [];
				this.dataSelectedItem = null;
				this.process = false;
				callback(true, res);
			})
			.catch((error: any) => {
				this.process = false;
				Alert.alert('Error', error);
			});
	}
	@action
	async EditStock(store: any, item: IProduct, updateQty: number, callback: any) {
		this.process = true;
		if (!updateQty) {
			Alert.alert("Product update failed!", "Product have invalid qty")
			this.process = false;
			return
		}
		const batch = firestore().batch();
		batch.update(storeAccountRef()
			.doc(store.key)
			.collection("products")
			.doc(item.key), item);

		const increment = firebase.firestore.FieldValue.increment(updateQty);
		const update = {
			totalQty: increment
		}
		batch.update(productRef()
			.doc(item.key), update);
		batch
			.commit()
			.then((res) => {
				this.UMPrice = []
				this.totalQty = null;
				this.category = null;
				this.varaint = [];
				this.dataSelectedItem = null;
				this.process = false;
				callback(true, res);
			})
			.catch((error: any) => {
				this.process = false;
				Alert.alert('Error', error);
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
				callback(null);
			});
	}

	@action
	async deleteProduct(user: any, key: string) {
		const item = {
			deleted_by: user,
			deleted_date: new Date,
			status: StatusObject().DELETED
		}
		productRef()
			.doc(key)
			.update(item)
			.then((item: any) => {
				Alert.alert('Product Delete Successfully');
			})
			.catch((error) => {
				Alert.alert('error', error);
			});
	}

	@action
	async deleteItem(user: any, item: any) {
		const batch = firestore().batch();
		batch.delete(storeAccountRef()
			.doc(user.key)
			.collection("products")
			.doc(item.key));
		const increment = firebase.firestore.FieldValue.increment(+item.totalQty);
		const update = {
			totalQty: increment,
			update_by: user,
			update_date: new Date()
		}
		batch.update(productRef()
			.doc(item.key), update);

		batch.commit()
			.then((res) => {
				this.process = false;
				Alert.alert('Product Delete Successfully');
			})
			.catch((error: any) => {
				this.process = false;
				Alert.alert('Error', error);
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
				callback(null);
			});
	}

	@action
	async deleteGallery(img: string) {
		await storageRef()
			.refFromURL(img)
			.delete()
			.then(() => {
			})
			.catch((error) => {
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
			});
	}

	@action
	async setUMPrice(UMPrice: any) {
		const doc: any = []
		const data = doc.concat({ ...UMPrice, key: createId() }, this.UMPrice)
		this.UMPrice = data
		const varaint = groupBy(this.UMPrice, ['color', 'size'], 'totalQty')
		this.varaint = varaint
		const total = await varaint.map((m: any) => { return m.totalQty })
		this.totalQty = eval(total.join("+"));

	}
	@action
	async setEditUMPrice(UMPrice: any, totalQty: number) {
		this.UMPrice = UMPrice
		this.totalQty = totalQty

	}
	@action
	async removeUMPrice(UMPrice: any) {
		const filter = await this.UMPrice.filter((m) => { return m.key !== UMPrice.key })
		this.UMPrice = filter
		const varaint = groupBy(this.UMPrice, ['color', 'size'], 'totalQty')
		const total = await varaint.map((m) => { return m.totalQty })
		this.totalQty = eval(total.join("+"));
	}

	@action
	selectedUnitMeasurement(item: any, UMPrice: any) {
		if (UMPrice.length > 0) {
			const data = item.range.filter((m: any) => { return m.text == UMPrice[0].text })
			if (data.length > 0) {
				this.unitMeasurement = item;

			} else {
				this.UMPrice = []
				this.totalQty = null
				this.unitMeasurement = item;
			}
		} else {
			this.unitMeasurement = item;
		}

	}
}
