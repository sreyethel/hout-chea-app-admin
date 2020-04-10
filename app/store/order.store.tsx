import { observable, action } from 'mobx';
import { firestore, OrderRef } from '../services/data.service';
import { pushToArray, pageKey, toOrderKey } from '../services/mapping.service';
import { orderStatus } from '../dummy/status';
import MODULE from './../modules';
import moment from 'moment';
export default class OrderStore {
	@observable dataOrder: Array<any> = [];
	@observable dataRecentOrder: Array<any> = [];
	@observable selectedStatusKey: any = null;
	@observable selectedOrder: any = null;
	@observable loading: boolean = false;
	@observable dataAllOrder: Array<any> = [];

	@observable processing: boolean = false;

	@observable
	dataStatistic: Array<any> = [
		{ key: 1, value: 0, color: MODULE.PROGRESS_COLOR[1] },
		{ key: 2, value: 0, color: MODULE.PROGRESS_COLOR[4] },
		{ key: 3, value: 0, color: MODULE.PROGRESS_COLOR[0] },
		{ key: 4, value: 0, color: MODULE.PROGRESS_COLOR[3] }
	];

	@observable dataLastSevenDays: Array<any> = [];

	@action
	async fetchOrder(statusKey?: number) {
		if (statusKey == null) {
		} else {
			await OrderRef().where('order_status.key', '==', statusKey).onSnapshot((item) => {
				this.dataOrder = pushToArray(item);
			});
		}

		await OrderRef().where('order_status.key', '==', 1).onSnapshot((item) => {
			this.dataRecentOrder = pushToArray(item);
		});

		var lastWeek: any = moment();
		lastWeek = lastWeek.subtract(5, 'days');
		lastWeek = toOrderKey(lastWeek);

		//////filter orders status pieChart //////
		await OrderRef().onSnapshot((item) => {
			const docs: Array<any> = pushToArray(item);
			this.dataAllOrder = docs;
			const dataComplete: Array<any> = docs.filter((item) => {
				return item.order_status.key == 3;
			});
			const dataCancel = docs.filter((item) => {
				return item.order_status.key == 5;
			});
			const dataPending = docs.filter((item) => {
				return item.order_status.key == 1;
			});
			const dataConfirm = docs.filter((item) => {
				return item.order_status.key == 2;
			});
			
			this.dataStatistic = [
				{ key: 1, value: dataPending.length, color: MODULE.PROGRESS_COLOR[1] },
				{ key: 2, value: dataConfirm.length, color: MODULE.PROGRESS_COLOR[4] },
				{ key: 3, value: dataComplete.length, color: MODULE.PROGRESS_COLOR[0] },
				{ key: 4, value: dataCancel.length, color: MODULE.PROGRESS_COLOR[3] }
			];
		});

		///////Filter Bar Chart///////
		await OrderRef().where('order_date_key', '>=', lastWeek).onSnapshot((item) => {
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
							color: [ '#12c2e9', '#c471ed', '#f64f59' ]
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
	}

	@action
	async onCompleteOrder(item: any, callback: any) {
		this.loading = true;
		const batch = firestore().batch();

		const items = {
			order_status: orderStatus[2],
			complete_date: new Date(),
			complete_date_key: pageKey()
		};
		batch.update(OrderRef().doc(item.key), items);

		batch
			.commit()
			.then(() => {
				this.loading = false;
				callback(true);
			})
			.catch((error: any) => {
				callback(false);
				console.log('error', error);
			});
	}

	@action
	async onConfirmOrder(item: any, callback: any) {
		this.loading = true;
		const batch = firestore().batch();

		const items = {
			order_status: orderStatus[1],
			complete_date: new Date(),
			complete_date_key: pageKey()
		};
		batch.update(OrderRef().doc(item.key), items);

		batch
			.commit()
			.then(() => {
				this.loading = false;
				callback(true);
			})
			.catch((error: any) => {
				callback(false);
				console.log('error', error);
			});
	}

	@action
	async onCancelOrder(item: any, callback: any) {
		this.processing = true;
		const batch = firestore().batch();
		// const orderNumber = orderKey();
		// const orderItems = item.reduce((a: any, b: any) => a + Number(b.qty) * Number(b.item.price), 0);

		const items = {
			order_status: orderStatus[4],
			complete_date: new Date(),
			complete_date_key: pageKey()
		};
		batch.update(OrderRef().doc(item.key), items);
		batch
			.commit()
			.then(() => {
				this.processing = false;
				callback(true);
			})
			.catch((error: any) => {
				callback(false);
				console.log('error', error);
			});
	}
}
