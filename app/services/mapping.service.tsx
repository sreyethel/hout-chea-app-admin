import { RNFirebase } from 'react-native-firebase';
import moment from 'moment';
import _ from 'lodash';

export function nFormatter(num: number, digits: number) {
	var si = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' }
	];
	var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var i;
	for (i = si.length - 1; i > 0; i--) {
		if (num >= si[i].value) {
			break;
		}
	}
	return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

export function pushToArray(snapshot: RNFirebase.firestore.QuerySnapshot) {
	if (snapshot.empty) return [];
	return snapshot.docs.map((m) => ({ ...m.data(), id: m.id }));
}

export function pushToObject(snapshot: RNFirebase.firestore.DocumentSnapshot) {
	if (!snapshot.exists) return null;
	return { ...snapshot.data(), id: snapshot.id };
}

export function toArray(value: any) {
	if (value === undefined || value === null) {
		return [];
	}
	return value;
}

export function fieldArrayValue(data: any, key: any) {
	if (toArray(data).length === 0) {
		return [ key ];
	} else {
		return null;
	}
}

export function userObject(user: any) {
	const { uid, displayName, email, isAnonymous, emailVerified, metadata, phoneNumber, photoURL } = user;
	return {
		key: uid,
		uid,
		displayName,
		email,
		isAnonymous,
		emailVerified,
		metadata,
		phoneNumber,
		photoURL
	};
}

export function pageKey() {
	return Number(moment().format('YYYYMMDDHHmmss'));
}
export function toPageKey(key: any) {
	return Number(moment(key).format('YYYYMMDDHHmmss'));
}

export function toOrderKey(key: any) {
	return Number(moment(key).format('YYYYMMDDhhmmssSSSS'));
}

export function toLookUp(val: any) {
	return val.replace(/\s+/g, '').toLowerCase().trim();
}

export function StatusObject() {
	return {
		ACTIVE: { key: 1, text: 'Active' },
		DISABLED: { key: 2, text: 'Disabled' }
	};
}

export function toNumber(value: any) {
	if (value === null || value === '' || value === undefined) {
		return 0;
	}
	if (Number(value) === NaN) return 0;
	return Number(value);
}
