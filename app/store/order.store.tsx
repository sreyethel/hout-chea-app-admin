import { observable, action } from 'mobx';
import { firestore, OrderRef, productRef, storeRef, saleRef, createId, customerRef, storeAccountRef } from '../services/data.service';
import { pushToArray, pageKey, toOrderKey, pushToObject, StatusObject, } from '../services/mapping.service';
import { orderStatus } from '../dummy/status';
import MODULE from './../modules';
import moment from 'moment';
import firebase from 'react-native-firebase';
export default class OrderStore {
	@observable dataOrder: Array<any> = [];
	@observable dataRecentOrder: Array<any> = [];
	@observable selectedStatusKey: any = null;
	@observable selectedOrder: any = null;
	@observable loading: boolean = false;
	@observable dataAllOrder: Array<any> = [];
	@observable processing: boolean = false;
	@observable processingOrder: boolean = false;
	@observable processingDelivery: boolean = false;
	@observable processingCompleteOrder: boolean = false;
	@observable processingConfirmOrder: boolean = false;
	@observable processingReturnItemOrder: boolean = false;

	@observable
	dataStatistic: Array<any> = [
		{ key: 1, value: 0, color: MODULE.PROGRESS_COLOR[0] },
		{ key: 2, value: 0, color: MODULE.PROGRESS_COLOR[1] },
		{ key: 3, value: 0, color: MODULE.PROGRESS_COLOR[2] },
		{ key: 4, value: 0, color: MODULE.PROGRESS_COLOR[3] },
		{ key: 5, value: 0, color: MODULE.PROGRESS_COLOR[4] },
		{ key: 6, value: 0, color: MODULE.PROGRESS_COLOR[5] }
	];

	@observable dataLastSevenDays: Array<any> = [];

	@action
	async fetchOrder(store: any, statusKey?: number) {
		if (statusKey == null) {
		} else {
			await storeRef()
			.doc(store.key)
			.collection("storeOrder")
			.where('order_status.key', '==', statusKey)
			.onSnapshot((item) => {
				this.dataOrder = pushToArray(item);
			});
		}

		await storeRef().doc(store.key).collection("storeOrder").where('order_status.key', '==', 1).onSnapshot((item) => {
			this.dataRecentOrder = pushToArray(item);
		});
		var lastWeek: any = moment();
		lastWeek = lastWeek.subtract(5, 'days');
		lastWeek = toOrderKey(lastWeek);

		await storeRef().doc(store.key).collection("storeOrder").onSnapshot((item) => {
			const docs: Array<any> = pushToArray(item);
			this.dataAllOrder = docs;
			const dataComplete: Array<any> = docs.filter((item) => {
				return item.order_status.key == 4;
			});
			const dataCancel = docs.filter((item) => {
				return item.order_status.key == 6;
			});
			const dataRecentOrder = docs.filter((item) => {
				return item.order_status.key == 5;
			});
			const dataPending = docs.filter((item) => {
				return item.order_status.key == 1;
			});
			const dataConfirm = docs.filter((item) => {
				return item.order_status.key == 2;
			});
			const dataDelivery = docs.filter((item) => {
				return item.order_status.key == 3;
			});


			this.dataStatistic = [
				{ key: 1, value: dataPending.length, color: MODULE.PROGRESS_COLOR[0] },
				{ key: 2, value: dataConfirm.length, color: MODULE.PROGRESS_COLOR[1] },
				{ key: 3, value: dataDelivery.length, color: MODULE.PROGRESS_COLOR[2] },
				{ key: 4, value: dataCancel.length, color: MODULE.PROGRESS_COLOR[3] },
				{ key: 5, value: dataComplete.length, color: MODULE.PROGRESS_COLOR[4] },
				{ key: 6, value: dataRecentOrder.length, color: MODULE.PROGRESS_COLOR[5] }
			];
		});

		await storeRef().doc(store.key).collection("storeOrder").where('order_date_key', '>=', lastWeek).onSnapshot((item) => {
			this.loading = true;
			const docs = pushToArray(item);
			let dataSevenDays: Array<any> = this.formattedList(docs);
			dataSevenDays.sort().reverse();
			this.dataLastSevenDays = dataSevenDays.reduce(
				(a: any, b: any) =>
					a.concat([
						{
							date: b.date,
							value: b.order.length > 0 ? b.order.length * 10 : 0.5 * 10,
							color: ['#12c2e9', '#c471ed', '#f64f59']
						}
					]),
				[]
			);
			this.loading = false;
		});
	}

	@action
	async fetchStoreOrder(profile: any, statusKey?: number) {
		if (statusKey == null) {
		} else {
			await storeAccountRef().doc(profile.key).collection("storeOrder").where('order_status.key', '==', statusKey).onSnapshot((item) => {
				this.dataOrder = pushToArray(item);
			});
		}

		await storeAccountRef().doc(profile.key).collection("storeOrder").where('order_status.key', '==', 1).onSnapshot((item) => {
			this.dataRecentOrder = pushToArray(item);
		});
		var lastWeek: any = moment();
		lastWeek = lastWeek.subtract(5, 'days');
		lastWeek = toOrderKey(lastWeek);

		await storeAccountRef().doc(profile.key).collection("storeOrder").onSnapshot((item) => {
			const docs: Array<any> = pushToArray(item);
			this.dataAllOrder = docs;
			const dataComplete: Array<any> = docs.filter((item) => {
				return item.order_status.key == 4;
			});
			const dataCancel = docs.filter((item) => {
				return item.order_status.key == 6;
			});
			const dataRecentOrder = docs.filter((item) => {
				return item.order_status.key == 5;
			});
			const dataPending = docs.filter((item) => {
				return item.order_status.key == 1;
			});
			const dataConfirm = docs.filter((item) => {
				return item.order_status.key == 2;
			});
			const dataDelivery = docs.filter((item) => {
				return item.order_status.key == 3;
			});


			this.dataStatistic = [
				{ key: 1, value: dataPending.length, color: MODULE.PROGRESS_COLOR[0] },
				{ key: 2, value: dataConfirm.length, color: MODULE.PROGRESS_COLOR[1] },
				{ key: 3, value: dataDelivery.length, color: MODULE.PROGRESS_COLOR[2] },
				{ key: 4, value: dataCancel.length, color: MODULE.PROGRESS_COLOR[3] },
				{ key: 5, value: dataComplete.length, color: MODULE.PROGRESS_COLOR[4] },
				{ key: 6, value: dataRecentOrder.length, color: MODULE.PROGRESS_COLOR[5] }
			];
		});

		await storeAccountRef().doc(profile.key).collection("storeOrder").where('order_date_key', '>=', lastWeek).onSnapshot((item) => {
			this.loading = true;
			const docs = pushToArray(item);
			let dataSevenDays: Array<any> = this.formattedList(docs);
			dataSevenDays.sort().reverse();
			this.dataLastSevenDays = dataSevenDays.reduce(
				(a: any, b: any) =>
					a.concat([
						{
							date: b.date,
							value: b.order.length > 0 ? b.order.length * 10 : 0.5 * 10,
							color: ['#12c2e9', '#c471ed', '#f64f59']
						}
					]),
				[]
			);
			this.loading = false;
		});
	}
	////filter 7 days ////////
	formattedList(docs: any) {
		const last7Days: any = this.Last7Days();
		let data7Days: any = [];
		last7Days
			.map((r: any) => {
				const order = docs.filter((m: any) => {
					return String(moment(m.order_date_key, 'YYYYMMDDHHmmssSSSS').format('ddd')) === r.date;
				});
				data7Days.push({
					date: r.date,
					order: order ? order : {}
				});
			})
			.slice();
		return data7Days;
	}

	///////get last 7 days///////
	@action
	Last7Days() {
		let daysAgo: any = [];
		let days: any = {};
		for (var i = 0; i < 7; i++) {
			days = {
				date: moment().subtract(i, 'days').format('ddd')
			};
			daysAgo.push(days);
		}
		return daysAgo;
	}

	@action
	onSelectedStatusKey(key: any) {
		this.selectedStatusKey = key;
	}

	@action
	SelectedOrder(item: any) {
		this.selectedOrder = item;
		this.processingOrder = false;
	}

	@action
	async onConfirmOrder(store: any, item: any, userCanActive: any, profile: any, callback: any) {
		this.processingConfirmOrder = true;
		const batch = firestore().batch();
		const order = {
			order_step_two: {
				active: true,
				name: 'order completed item',
				description: `Store have been confirmed your order.`,
				date: new Date(),
			},
			order_status: orderStatus[1],
			complete_date: new Date(),
			complete_date_key: pageKey()

		};
		if (userCanActive) {
			batch.update(storeRef().doc(store.key).collection('storeOrder').doc(item.key), order);
			
		} else {
			batch.update(storeAccountRef().doc(profile.key).collection('storeOrder').doc(item.key), order);
		}

		batch.update(OrderRef().doc(item.key), order);
		batch
			.commit()
			.then(() => {
				this.processingConfirmOrder = false;
				callback(true);
			})
			.catch((error: any) => {
				this.processingConfirmOrder = false;
				callback(false);
			});

	}

	@action
	async onCompleteOrder(store: any, item: any, userCanActive: any, profile: any, callback: any) {
		this.processingCompleteOrder = true;
		const batch = firestore().batch();
		const items = {
			order_step_four: {
				active: true,
				name: 'order completed item',
				description: `${item.user.fullName} have been received ${item.name}.`,
				date: new Date(),
			},
			order_status: orderStatus[3],
			complete_date: new Date(),
			complete_date_key: pageKey()
		};
		batch.update(OrderRef().doc(item.key), items);
		if (userCanActive) {
			batch.update(storeRef().doc(store.key).collection('storeOrder').doc(item.key), items);
		} else {
			batch.update(storeAccountRef().doc(profile.key).collection('storeOrder').doc(item.key), items);
		}
		batch
			.commit()
			.then(() => {
				this.processingCompleteOrder = false;
				callback(true);
			})
			.catch((error: any) => {
				this.processingCompleteOrder = false;
				callback(false);
			});
	}
	@action
	async onReturnItemOrder(store: any, item: any, userCanActive: any, profile: any, callback: any) {
		this.processingReturnItemOrder = true;
		const batch = firestore().batch();
		const items = {
			order_status: orderStatus[4],
			complete_date: new Date(),
			complete_date_key: pageKey()

		};
		batch.update(OrderRef().doc(item.key), items);
		if (userCanActive) {
			batch.update(storeRef().doc(store.key).collection('storeOrder').doc(item.key), items);
		} else {
			batch.update(storeAccountRef().doc(profile.key).collection('storeOrder').doc(item.key), items);
		}

		batch
			.commit()
			.then(() => {
				this.processingReturnItemOrder = false;
				callback(true);
			})
			.catch((error: any) => {
				this.processingReturnItemOrder = false;
				callback(false);
			});
	}
	@action
	async onConfirmDelivery(store: any, item: any, time: number, userCanActive: any, profile: any, callback: any) {
		this.processingDelivery = true;
		const batch = firestore().batch();
		const items = {
			order_step_three: {
				active: true,
				name: 'order delivery item',
				description: `Item on delivery estimate time: ${time} hours`,
				estimate_time: time
			},
			order_status: orderStatus[2],
			complete_date: new Date(),
			complete_date_key: pageKey()

		};
		batch.update(OrderRef().doc(item.key), items);
		if (userCanActive) {
			batch.update(storeRef().doc(store.key).collection('storeOrder').doc(item.key), items);
		} else {
			batch.update(storeAccountRef().doc(profile.key).collection('storeOrder').doc(item.key), items);
		}

		batch
			.commit()
			.then(() => {
				this.processingDelivery = false;
				callback(true);
			})
			.catch((error: any) => {
				this.processingDelivery = false;
				callback(false);
			});
	}

	@action
	async onCancelOrder(store: any, item: any, userCanActive: any, profile: any, callback: any) {
		this.processing = true;
		const batch = firestore().batch();
		const items = {
			order_status: orderStatus[5],
			complete_date: new Date(),
			complete_date_key: pageKey()

		};
		batch.update(OrderRef().doc(item.key), items);
		if (userCanActive) {
			batch.update(storeRef().doc(store.key).collection('storeOrder').doc(item.key), items);
		} else {
			batch.update(storeAccountRef().doc(profile.key).collection('storeOrder').doc(item.key), items);
		}

		batch
			.commit()
			.then(() => {
				this.processing = false;
				callback(true);
			})
			.catch((error: any) => {
				this.processing = false;
				callback(false);
			});
	}

	@action
	async fetchOrderByKey(key: string) {
		this.processingOrder = true
		await OrderRef().doc(key).get().then((item: any) => {
			this.selectedOrder = pushToObject(item)
			this.processingOrder = false
		}).catch((err) => {
			this.processingOrder = false
		})
	}
}
