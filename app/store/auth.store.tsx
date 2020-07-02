import { observable, action } from 'mobx';
import { authRef } from '../services/auth.service';
import { Alert } from 'react-native';
import { storeAccountRef, firestore, storeRef } from '../services/data.service';
import { pushToObject, pushToArray, userObject, pageKey } from '../services/mapping.service';
import { storageRef } from '../services/storage.service';
import firebase from 'react-native-firebase';
import { StatusObj } from '../dummy/status';
import SplashScreen from 'react-native-splash-screen';

export default class AuthStore {
	@observable process: boolean = false;
	@observable loading: boolean = true;
	@observable user: any = null;
	@observable userCanActive: boolean = false;
	@observable store: any = null;
	@observable profile: any = null;
	@observable confirmationResult: any = null;
	@observable phone: string = '';
	@observable country: string = '+855';
	@observable selectedStore: any = null;
	@observable authSubscription: any = null;
	HOME_TAB: string = 'Home';

	@action
	async	signInWithPhoneNumber(country: string, phone: string, navigation: any) {
		const phoneNumber = `${country}${Number(phone)}`;
		console.log('phoneNumber', phoneNumber)
		this.country = country;
		this.phone = phone;
		this.confirmationResult = null;
		this.process = true;
		await firestore()
		.collection('permission_user')
		.where('phoneNumber', '==', phoneNumber)
		.get().then((item: any) => {
			const docs = pushToArray(item);
			console.log('docs', docs)
			if (docs.length > 0) {
				authRef()
					.signInWithPhoneNumber(phoneNumber, true)
					.then((confirm) => {
						this.confirmationResult = confirm;
						navigation.navigate('PhoneCode');
						this.process = false;
					})
					.catch((error) => {
						this.process = false;
						const { code } = error;
						Alert.alert('Error', code);
					});
			} else {
				Alert.alert("You don't have permission to access this app");
				this.process = false;
			}
		}).catch((err) => {
			console.log('err', err)
		})
			;
	}

	@action
	confirmCode(code: string, navigation: any) {
		if (this.confirmationResult) {
			this.process = true;
			this.confirmationResult
				.confirm(code)
				.then(async (user: any) => {
					this.process = false;
					this.user = user;
					navigation.navigate('Home');
				})
				.catch((error: { message: string }) => {
					Alert.alert(error.message);
					this.process = false;
				});
		}
	}

	@action
	async createAccount(name: string, email: string, coordinate: any, address: any) {
		this.loading = true;
		var PreUser: any = await firebase.auth().currentUser;

		await PreUser.updateProfile({
			displayName: name
		});
		var user: any = await firebase.auth().currentUser;
		const item = {
			...userObject(user),
			stores: null,
			key: user.uid,
			email: email,
			badge: 0,
			page_key: pageKey(),
			created_by: userObject(user),
			created_date: new Date(),
			updated_by: userObject(user),
			updated_date: new Date(),
			status: StatusObj.active,
			selected_store: null,
			storeTypeVerified: false,
			storeVerified: false,
			mapVerified: false,
			map: coordinate,
			address: address,
			departmentVerified: false
		};
		storeAccountRef().doc(item.key).set(item).then(() => {
			this.loading = false;
		});
	}

	@action
	async verifyAndroid(navigation: any) {
		this.process = true;
		await authRef().onAuthStateChanged((user: any) => {
			this.process = false;
			this.user = user;
			navigation.navigate('WELCOME');
		});
	}

	@action
	async logOut(navigation: any) {
		this.process = true;
		this.loading = false;
		this.selectedStore = null;
		this.profile = null;
		this.store = null;
		this.user = null;
		await authRef().signOut();
		this.process = false;
		await navigation.navigate('Login');
	}

	@action
	fetchUser(uid: string) {
		storeAccountRef().doc(uid).onSnapshot(async (snapshot: any) => {
			const doc = pushToObject(snapshot);
			await storeRef().get().then((doc: any) => {
				const item = pushToArray(doc)
				this.store = item[0]
			})
			this.profile = doc;
		});
	}

	@action
	canActive(navigation: any, callback: any) {
		this.loading = true;
		this.authSubscription = authRef().onAuthStateChanged(async (user: any) => {
			if (user) {
				const { uid } = user;
				await storeAccountRef().doc(uid).onSnapshot(async (snapshot: any) => {
					SplashScreen.hide();
					if (!snapshot.exists) {
						this.loading = false;
						navigation.navigate('RegisterUser');
						callback(null);
						return;
					}
					const doc: any = pushToObject(snapshot);
					this.profile = doc;
					if (doc) {
						this.userCanActive = doc.isAdmin
						await storeRef().get().then(async (doc: any) => {
							const item = pushToArray(doc)
							this.store = item[0];
						})
					}
					callback(doc);
				});
			} else {
				this.loading = false;
				SplashScreen.hide();

				navigation.navigate('AUTH');
				callback(false);
			}
		});
	}

	@action
	async updateProfile(item: any, path: any, callback: any) {
		this.process = true;
		if (path) {
			if (path == this.profile.photoURL) {
				item.photoURL = this.profile.photoURL;
			} else {
				await this.uploadPhoto(item.key, path, (img: any) => {
					if (img) {
						item.photoURL = img;
					}
				});
			}
		}
		await storeAccountRef()
			.doc(item.key)
			.update(item)
			.then((res) => {
				this.process = false;
				callback(true);
			})
			.catch((error) => {
				this.process = false;
				callback(false);
			});
	}

	@action
	async uploadPhoto(uid: string, path: any, callback: any) {
		this.process = true;
		const filePath = `store_account/${uid}/${uid}`;
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
}
