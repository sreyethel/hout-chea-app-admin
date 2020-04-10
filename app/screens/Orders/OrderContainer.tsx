import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { AppState } from '../RegisterStoreType/index';
import OrderScreen from './OrderScreen';
import { inject, observer } from 'mobx-react';

export interface AppProps {
	navigation: any;
	order: any;
	auth: any;
}

export interface AppState {}

@inject('order', 'auth')
@observer
export default class OrderContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.order.fetchOrder(1);
	}

	_onOrderDetail = (item: any) => {
		this.props.order.SelectedOrder(item);
		this.props.navigation.navigate('ORDER_DETAIL');
	};

	_onOrderByStatus = async (key: number) => {
		await this.props.order.onSelectedStatusKey(key);
		this.props.navigation.navigate('ORDER_BY_STATUS');
	};

	public render() {
		const { dataRecentOrder } = this.props.order;
		return (
			<OrderScreen
				onOrderByStatus={this._onOrderByStatus}
				dataOrder={dataRecentOrder}
				onOrderDetail={this._onOrderDetail}
				navigation={this.props.navigation}
			/>
		);
	}
}
