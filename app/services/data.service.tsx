import firebase from 'react-native-firebase';
const db = firebase.firestore();

export function marketRef() {
	return db.collection('market');
}
export function categoryRef() {
	return db.collection('category');
}
export function SubCategoryRef() {
	return db.collection('sub_category');
}
export function subCategoryRef() {
	return db.collection('sub_category');
}

export function firestore() {
	return db;
}

export function feedBackRef() {
	return db.collection('feedback');
}

export function createId() {
	return db.collection('products').doc().id;
}

export function batchRef() {
	return firebase.firestore().batch();
}

export function userRef() {
	return db.collection('users');
}

export function customerRef() {
	return db.collection('customer');
}

export function productRef() {
	return db.collection('products');
}
export function environmentRef() {
	return firebase.firestore().collection('environment');
}

export function storeRef() {
	return db.collection('store');
}
export function saleRef() {
	return db.collection('sale');
}

export function validatePhoneNumberRef(phone: string) {
	return db.collection('store').where('phoneNumber', '==', phone);
}

export function provinceRef() {
	return db.collection('geo_provinces');
}

export function districtRef() {
	return db.collection('geo_districts');
}

export function communeRef() {
	return db.collection('geo_communes');
}

export function villageRef() {
	return db.collection('geo_villages');
}

export function ownerUserRef() {
	return db.collection('owner_users');
}

export function storeAccountRef() {
	return db.collection('store_account');
}

export function geoPoint(latitude: number, longitude: number) {
	return new firebase.firestore.GeoPoint(latitude, longitude);
}

export function OrderRef() {
	return db.collection('orders');
}

export function bannerRef() {
	return db.collection('banners');
}

export function promotionRef() {
	return db.collection('promotions');
}

export function posterRef() {
	return db.collection('posters');
}

export function locationRef() {
	return db.collection('store_location');
}
