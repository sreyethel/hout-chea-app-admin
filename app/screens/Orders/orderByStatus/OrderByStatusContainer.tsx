import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import OrderByStatusScreen from './OrderByStatusScreen';
import { inject, observer } from 'mobx-react';

export interface AppProps {
	order: any;
	auth: any;
	navigation: any;
}

export interface AppState {
	title: string;
}

@inject('order', 'auth')
@observer
export default class OrderByStatusContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			title: ''
		};
	}

	async componentDidMount() {
		const { selectedStatusKey } = this.props.order;
		const { profile } = this.props.auth;
		await this.props.order.fetchOrder(profile, selectedStatusKey);
		switch (selectedStatusKey) {
			case null:
				await this.setState({ title: 'All Order' });
				break;
			case 1:
				await this.setState({ title: 'Pending' });
				break;
			case 2:
				await this.setState({ title: 'Confirmed' });
				break;
			case 3:
				await this.setState({ title: 'Complete' });
				break;
			case 4:
				await this.setState({ title: 'Return' });
				break;
			case 5:
				await this.setState({ title: 'Cancel' });
				break;
		}
	}

	_onGoBack = () => {
		this.props.navigation.goBack();
	};

	_onOrderDetail = (item: any) => {
		this.props.order.SelectedOrder(item);
		this.props.navigation.navigate('ORDER_DETAIL');
	};

	public render() {
		const { title } = this.state;
		const { dataOrder, dataAllOrder } = this.props.order;
		const { selectedStatusKey } = this.props.order;
		return (
			<OrderByStatusScreen
				onOrderDetail={this._onOrderDetail}
				dataOrder={selectedStatusKey ? dataOrder : dataAllOrder}
				title={title}
				onGoBack={this._onGoBack}
			/>
		);
	}
}
