import * as React from 'react';
import OrderScreen from './OrderScreen';
import { inject, observer } from 'mobx-react';
import { storeRef, storeAccountRef } from '../../services/data.service';
import { pushToArray } from '../../services/mapping.service';

export interface AppProps {
	navigation: any;
	order: any;
	auth: any;
}

export interface AppState {
	loading: boolean,
	newOrder: any
}

@inject('order', 'auth')
@observer
export default class OrderContainer extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			loading: true,
			newOrder: []
		};
	}

	async componentDidMount() {
		const { store, profile, userCanActive } = this.props.auth;
		if (userCanActive) {
			storeRef()
				.doc(store.id)
				.collection('storeOrder')
				.where('order_status.key', "==", 1)
				.orderBy('order_date_key', 'DESC')
				.onSnapshot((item) => {
					const doc = pushToArray(item)
					this.setState({ newOrder: doc })
					this.setState({ loading: false })
				})
		} else {
			storeAccountRef()
				.doc(profile.id)
				.collection('storeOrder')
				.where('order_status.key', "==", 1)
				.orderBy('order_date_key', 'DESC')
				.onSnapshot((item) => {
					const doc = pushToArray(item)
					this.setState({ newOrder: doc })
					this.setState({ loading: false })
				})
		}


	}

	_onOrderDetail = (item: any) => {
		this.props.order.SelectedOrder(item);
		this.props.navigation.navigate('ORDER_DETAIL');
	};

	_onOrderByStatus = async (doc: any) => {
		this.setState({ loading: true })
		const { store, profile, userCanActive } = this.props.auth;
		if (userCanActive) {
			storeRef()
				.doc(store.id)
				.collection('storeOrder')
				.where('order_status.key', "==", doc.key)
				.orderBy('order_date_key', 'DESC')
				.onSnapshot((item) => {
					const doc = pushToArray(item)
					this.setState({ newOrder: doc })
					this.setState({ loading: false })
				})
		}
		else {
			storeAccountRef()
				.doc(profile.id)
				.collection('storeOrder')
				.where('order_status.key', "==", doc.key)
				.orderBy('order_date_key', 'DESC')
				.onSnapshot((item) => {
					const doc = pushToArray(item)
					this.setState({ newOrder: doc })
					this.setState({ loading: false })
				})
		}
	};

	_onOrderReject = async () => {
		this.setState({ loading: true })
		const { store, profile, userCanActive } = this.props.auth;
		if (userCanActive) {
			storeRef()
			.doc(store.id)
			.collection('storeOrder')
			.where('order_status.key', "==", 6)
			.orderBy('order_date_key', 'DESC')
			.onSnapshot((item) => {
				const doc = pushToArray(item)
				this.setState({ newOrder: doc })
				this.setState({ loading: false })
			})
		}else{
			storeAccountRef()
			.doc(profile.id)
			.collection('storeOrder')
			.where('order_status.key', "==", 6)
			.orderBy('order_date_key', 'DESC')
			.onSnapshot((item) => {
				const doc = pushToArray(item)
				this.setState({ newOrder: doc })
				this.setState({ loading: false })
			})	
		}
		
	};

	public render() {
		const { dataRecentOrder } = this.props.order;
		const { newOrder, loading } = this.state
		return (
			<OrderScreen
				onOrderByStatus={this._onOrderByStatus}
				onOrderReject={this._onOrderReject}
				dataOrder={newOrder}
				loading={loading}
				onOrderDetail={this._onOrderDetail}
				navigation={this.props.navigation}
			/>
		);
	}
}
