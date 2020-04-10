import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import OrderDetailScreen from './OrderDetailScreen';
import { inject, observer } from 'mobx-react';

export interface AppProps {
	navigation: any;
	order: any;
	auth: any;
}

export interface AppState {}

@inject('order', 'auth')
@observer
export default class OrderDetailContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	_onCompleteOrder = () => {
		const { selectedOrder } = this.props.order;
		// const { auth } = this.props.auth;
		Alert.alert(
			'Complete Order',
			'Are you sure the order is complete?',
			[
				{
					text: 'Yes',
					onPress: () =>
						this.props.order.onCompleteOrder(selectedOrder, (res: any) => {
							if (res) {
								Alert.alert('Order Completed');
								this.props.navigation.goBack();
							}
						})
				},
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};

	_onConfirmOrder = () => {
		const { selectedOrder } = this.props.order;
		// const { auth } = this.props.auth;
		Alert.alert(
			'Confirm Order',
			'Please verify your order',
			[
				{
					text: 'Yes',
					onPress: () =>
						this.props.order.onConfirmOrder(selectedOrder, (res: any) => {
							if (res) {
								Alert.alert('Order Confirmed');
								this.props.navigation.goBack();
							}
						})
				},
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};

	_onCancelOrder = () => {
		const { selectedOrder } = this.props.order;
		// const { auth } = this.props.auth;

		Alert.alert(
			'Cancel Order',
			'Are you sure you want to canel this order?',
			[
				{
					text: 'Yes',
					onPress: () =>
						this.props.order.onCancelOrder(selectedOrder, (res: any) => {
							if (res) {
								Alert.alert('Order has Been Cancel');
								this.props.navigation.goBack();
							}
						})
				},
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};

	public render() {
		const { selectedOrder, loading, processing } = this.props.order;
		return (
			<OrderDetailScreen
				onCancelOrder={this._onCancelOrder}
				onCompleteOrder={this._onCompleteOrder}
				selectedOrder={selectedOrder}
				navigation={this.props.navigation}
				loading={loading}
				processing={processing}
				onConfirmOrder={this._onConfirmOrder}
			/>
		);
	}
}
