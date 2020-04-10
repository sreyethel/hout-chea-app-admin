import { action, observable } from 'mobx';
import { storeRef, batchRef, storeAccountRef, createId, geoPoint } from '../services/data.service';
import { pushToArray, pushToObject, pageKey, userObject, toLookUp, toArray } from '../services/mapping.service';
import { Alert, Clipboard } from 'react-native';
import { authRef } from '../services/auth.service';
import { IStore } from '../interface/store.inferface';
import { StatusObj, currencyObj } from '../dummy/status';
import { storageRef } from '../services/storage.service';

export default class Store {
	@observable store: any = null;
	@observable storeName: any = null;
	@observable country: any = '+855';
	@observable phone: any = null;
	@observable loading: boolean = true;
	@observable process: boolean = false;
	@observable refresh: boolean = false;
	@observable fetching: boolean = false;
	@observable confirmationResult: any = null;
	@observable storeDetail: any = null;
	@observable dataDepartment: Array<any> = [];
	@observable storeList: any = null;
	@observable user: any = null;
	lastVisible: any = null;

	async getData(uid: string) {
		const docs = await storeRef().doc(uid).get();
		const items = pushToObject(docs);
		this.store = items;
	}

	@action
	fetchData(storeKey: string) {
		this.loading = true;
		storeRef().doc(storeKey).onSnapshot((snapshot: any) => {
			this.store = pushToObject(snapshot);
			this.loading = false;
		});
	}

	@action
	async validateStore(name: string, navigation: any) {
		this.process = true;
		const data = await storeRef().where('lookup', '==', toLookUp(name)).get();
		if (data.empty) {
			this.process = false;
			this.storeName = name;
			navigation.navigate('REGISTER_STORE');
		} else {
			this.process = false;
			Alert.alert('Create Your Store', 'That store name is taken. Please try another.');
		}
	}

	@action
	async createStoreWithPhoneNumber(phone: any, navigation: any) {
		this.process = true;
		const user = await storeAccountRef().where('phoneNumber', '==', `${this.country}${Number(phone)}`).get();
		this.user = pushToArray(user);
		if (this.user.length <= 0) {
			this.confirmationResult = null;
			const phoneNumber = `${this.country}${Number(phone)}`;
			this.confirmationResult = null;
			this.phone = null;
			authRef()
				.signInWithPhoneNumber(phoneNumber)
				.then((confirm) => {
					this.confirmationResult = confirm;
					this.phone = phone;
					navigation.navigate('REGISTER_CONFIRM_CODE');
					this.process = false;
				})
				.catch((error) => {
					this.process = false;
					const { code } = error;
					Alert.alert('Error', code);
				});
		} else {
			Alert.alert('This phone number has already been registered. Please choose another phone number');
			this.process = false;
		}
	}

	@action
	createStoreResendPhoneNumber(phone: any) {
		this.process = true;
		this.confirmationResult = null;
		const phoneNumber = `${this.country}${Number(phone)}`;
		this.confirmationResult = null;
		this.phone = null;
		authRef()
			.signInWithPhoneNumber(phoneNumber)
			.then((confirm) => {
				this.confirmationResult = confirm;
				this.phone = phone;
				this.process = false;
			})
			.catch((error) => {
				this.process = false;
				const { code } = error;
				Alert.alert('Error', code);
			});
	}

	@action
	verifyAndroid(callback: any, navigation: any) {
		this.process = true;
		authRef().onAuthStateChanged(async (user: any) => {
			this.process = false;
			const batch = batchRef();
			const store: IStore = {
				key: createId(),
				page_key: pageKey(),
				created_by: userObject(user),
				created_date: new Date(),
				updated_by: userObject(user),
				updated_date: new Date(),
				status: StatusObj.active,
				name: this.storeName,
				lookup: toLookUp(this.storeName),
				like: 0,
				follow: 0,
				map: null,
				description: null,
				keywordSearchTag: [],
				avatar: null,
				phone: this.phone,
				phoneNumber: `${this.country}${Number(this.phone)}`,
				email: null,
				facebook: null,
				website: null,
				province: null,
				district: null,
				commune: null,
				village: null,
				street: null,
				homeNo: null,
				department: [],
				departmentTag: [],
				categories: [],
				categoryTag: [],
				shoppingCategory: [],
				shoppingCategoryTag: [],
				brand: [],
				brandTag: [],
				coverUrl: null,
				country: [],
				targetSale: 0,
				currency: currencyObj,
				storeOwner: userObject(user),
				storeDepartmentTag: [],
				storeDepartment: [],
				storeType: []
			};
			batch.set(storeRef().doc(store.key), store);
			batch.set(storeAccountRef().doc(user.uid), {
				...userObject(user),
				stores: [ store.key ],
				key: user.uid,
				page_key: pageKey(),
				created_by: userObject(user),
				created_date: new Date(),
				updated_by: userObject(user),
				updated_date: new Date(),
				status: StatusObj.active,
				selected_store: storeRef().doc(store.key),
				storeTypeVerified: false,
				storeVerified: false,
				mapVerified: false,
				departmentVerified: false
			});
			await batch
				.commit()
				.then(() => {
					this.process = false;
					callback(true, user);
				})
				.catch((error: any) => {
					Alert.alert('Create Your Store', error.message);
					callback(false, null);
				});
		});
	}

	@action
	confirmCode(code: string, callback: any, navigation: any) {
		if (this.confirmationResult) {
			this.process = true;
			this.confirmationResult
				.confirm(code)
				.then(async (user: any) => {
					this.process = false;
					const batch = batchRef();
					const store: IStore = {
						key: createId(),
						page_key: pageKey(),
						created_by: userObject(user),
						created_date: new Date(),
						updated_by: userObject(user),
						updated_date: new Date(),
						status: StatusObj.active,
						name: this.storeName,
						lookup: toLookUp(this.storeName),
						like: 0,
						follow: 0,
						map: null,
						description: null,
						keywordSearchTag: [],
						avatar: null,
						phone: this.phone,
						phoneNumber: `${this.country}${Number(this.phone)}`,
						email: null,
						facebook: null,
						website: null,
						province: null,
						district: null,
						commune: null,
						village: null,
						street: null,
						homeNo: null,
						department: [],
						departmentTag: [],
						categories: [],
						categoryTag: [],
						shoppingCategory: [],
						shoppingCategoryTag: [],
						brand: [],
						brandTag: [],
						coverUrl: null,
						country: [],
						targetSale: 0,
						currency: currencyObj,
						storeOwner: userObject(user),
						storeDepartmentTag: [],
						storeDepartment: [],
						storeType: []
					};
					batch.set(storeRef().doc(store.key), store);
					batch.set(storeAccountRef().doc(user.uid), {
						...userObject(user),
						stores: [ store.key ],
						key: user.uid,
						page_key: pageKey(),
						created_by: userObject(user),
						created_date: new Date(),
						updated_by: userObject(user),
						updated_date: new Date(),
						status: StatusObj.active,
						selected_store: storeRef().doc(store.key),
						storeTypeVerified: false,
						storeVerified: false,
						mapVerified: false,
						departmentVerified: false
					});
					await batch
						.commit()
						.then(() => {
							this.process = false;
							callback(true, user);
						})
						.catch((error: any) => {
							Alert.alert('Create Your Store', error.message);
							callback(false, null);
						});
				})
				.catch((error: { message: string }) => {
					this.process = false;
					Alert.alert('Create Your Store', error.message);
					callback(false, null);
				});
		} else {
			this.process = false;
			Alert.alert(
				'Create Your Store',
				'Please request confirm code again. Your confirm code invalid or expired.'
			);
			callback(false, null);
		}
	}

	@action
	addGeoPoint(latitude: number, longitude: number) {
		const location = geoPoint(latitude, longitude);
	}

	@action
	async addStoreInfo(user: any, store: any, callback: any) {
		this.process = true;
		const batch = batchRef();
		batch.update(storeRef().doc(store.key), {
			...store
		});
		batch.update(storeAccountRef().doc(user.id), {
			...userObject(user),
			store: store.key,
			key: user.uid,
			page_key: pageKey(),
			created_by: userObject(user),
			created_date: new Date(),
			updated_by: userObject(user),
			updated_date: new Date(),
			status: StatusObj.active,
			selected_store: storeRef().doc(store.key),
			storeVerified: true,
			mapVerified: false,
			departmentVerified: false
		});
		batch
			.commit()
			.then(() => {
				Alert.alert('Successfully insert store information');
				this.process = false;
				callback(true);
			})
			.catch((error: any) => {
				console.log('error', error);
				this.process = false;
				callback(null);
			});
	}

	@action
	addStoreLocation(user: any, key: any, latitude: number, longitude: number, callback: any) {
		const batch = batchRef();
		const map = geoPoint(latitude, longitude);
		batch.update(storeRef().doc(key), {
			map: map
		});
		batch.update(storeAccountRef().doc(user.uid), {
			...userObject(user),
			stores: [ key ],
			key: user.uid,
			page_key: pageKey(),
			created_by: userObject(user),
			created_date: new Date(),
			updated_by: userObject(user),
			updated_date: new Date(),
			status: StatusObj.active,
			selected_store: storeRef().doc(key),
			storeVerified: true,
			mapVerified: true,
			departmentVerified: false
		});
		batch
			.commit()
			.then(() => {
				Alert.alert('Successfully insert store information');
				callback(true);
				this.process = false;
			})
			.catch((error: any) => {
				console.log('error', error);
				callback(null);
				this.process = false;
			});
	}

	@action
	addStoreDepartment(user: any, key: any, item: any, callback: any) {
		this.process = true;
		const batch = batchRef();
		let brand: Array<any> = [];
		let brandTag: Array<any> = [];
		let categories: Array<any> = [];
		let categoryTag: Array<any> = [];
		let shopping: Array<any> = [];
		let shoppingTag: Array<any> = [];
		let departmentTagKey: Array<any> = [];

		for (let i of item) {
			brand = brand.concat(i.brand);
			brandTag = brandTag.concat(i.brandTag);
			if (i.categories) {
				categories = categories.concat(i.categories);
			}
			categoryTag = categoryTag.concat(i.categoryTag);
			shopping = shopping.concat(i.shopping);
			shoppingTag = shoppingTag.concat(i.shoppingTag);
			departmentTagKey.push(i.key);
		}
		batch.update(storeRef().doc(key), {
			department: item,
			departmentTag: departmentTagKey,
			brand: brand,
			brandTag: brandTag,
			categories: categories,
			categoryTag: categoryTag,
			shoppingCategory: shopping,
			shoppingCategoryTag: shoppingTag
		});
		batch.update(storeAccountRef().doc(user.uid), {
			...userObject(user),
			stores: [ key ],
			key: user.uid,
			page_key: pageKey(),
			created_by: userObject(user),
			created_date: new Date(),
			updated_by: userObject(user),
			updated_date: new Date(),
			status: StatusObj.active,
			selected_store: storeRef().doc(key),
			storeVerified: true,
			mapVerified: true,
			departmentVerified: true
		});
		batch
			.commit()
			.then(() => {
				Alert.alert('Successfully insert store information');
				callback(true);
				this.process = false;
			})
			.catch((error: any) => {
				console.log('error', error);
				callback(null);
				this.process = false;
			});
	}

	// @action
	// async fetchStoreDetail(key: any) {
	// 	this.process = true;
	// 	const store = await storeRef().doc(key).get();
	// 	this.storeDetail = pushToObject(store);
	// 	this.process = false;
	// 	console.log('this.process', this.process);
	// }

	@action
	async getAllStore(uid: any) {
		this.loading = true;
		storeAccountRef().doc(uid).onSnapshot((item: any) => {
			this.storeList = pushToObject(item);
			this.loading = false;
		});
	}

	@action
	async updateStore(item: any, path: any, store: any, callback: any) {
		this.process = true;
		if (path) {
			if (path == store.avatar) {
				item.avatar = store.avatar;
			} else {
				await this.uploadPhoto(item.key, path, (img: any) => {
					if (img) {
						item.avatar = img;
					}
				});
			}
		}
		await storeRef()
			.doc(item.key)
			.update(item)
			.then((res) => {
				this.process = false;
				callback(true);
			})
			.catch((error) => {
				this.process = false;
				callback(false);
				console.log('error', error);
			});
	}

	@action
	async uploadPhoto(uid: string, path: any, callback: any) {
		this.process = true;
		const filePath = `store/${uid}/${uid}`;
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
}
