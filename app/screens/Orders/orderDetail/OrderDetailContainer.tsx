import * as React from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import OrderDetailScreen from './OrderDetailScreen';
import { inject, observer } from 'mobx-react';
import { productRef, createId, storeAccountRef } from '../../../services/data.service';
import { pushToObject } from '../../../services/mapping.service';
import _ from 'lodash'

export interface AppProps {
	navigation: any;
	order: any;
	auth: any;
	location: any
	invalidItem: any
}

export interface AppState {
	docs: any;
	checking: boolean;
	invalidItem: any
}

@inject('order', 'auth', 'location')
@observer
export default class OrderDetailContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			docs: null,
			checking: true,
			invalidItem: null
		};
	}

	async	componentDidMount() {
		this.setState({ checking: true })
		const { selectedOrder, processingOrder } = this.props.order;
		const { store, userCanActive, profile, } = this.props.auth
		if (processingOrder == false) {
			const docs: any = []
			const arr = await _.orderBy(selectedOrder.items, 'item.name', 'asc');
			this.setState({ docs: arr })
			await arr.forEach(async (m: any) => {
				if(userCanActive){
					await productRef().doc(m.item.key).get().then(async (item) => {
						const data: any = pushToObject(item)
						const keyOrder: any = Number(new Date)
						const doc = {
							keyOrder,
							...data
						}
						docs.push(doc)
	
					})
				}else{
					await storeAccountRef().doc(profile.key).collection('products').doc(m.item.key).get().then(async (item) => {
						const data: any = pushToObject(item)
						const keyOrder: any = Number(new Date)
						const doc = {
							keyOrder,
							...data
						}
						docs.push(doc)
	
					})
				}
				
			})
			this.setState({ docs: docs })
			this.setState({ checking: false })
		}

	}

	_onCompleteOrder = () => {
		const { selectedOrder } = this.props.order;
		const { store, userCanActive, profile, } = this.props.auth
		Alert.alert(
			'Complete Order',
			'Are you sure the order is complete?',
			[
				{
					text: 'Yes',
					onPress: () =>
						this.props.order.onCompleteOrder(store, selectedOrder, userCanActive, profile, (res: any) => {
							if (res) {
								Alert.alert('Order Completed');
								this.props.navigation.goBack();
							}
						})
				},
				{
					text: 'Cancel',
					onPress: () => { },
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};
	_onReturnItemOrder = () => {
		const { selectedOrder } = this.props.order;
		const { store, userCanActive, profile, } = this.props.auth
		Alert.alert(
			'Return Order',
			'Are you sure the order is complete?',
			[
				{
					text: 'Yes',
					onPress: () =>
						this.props.order.onReturnItemOrder(store, selectedOrder, userCanActive, profile, (res: any) => {
							if (res) {
								Alert.alert('Order Returned');
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
		const { store, userCanActive, profile } = this.props.auth
		const doc: any = []
		const arr = _.orderBy(selectedOrder.items, 'item.name', 'desc');
		console.log('arr', arr)
		console.log('this.state.docs', this.state.docs)
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].totalQty > this.state.docs[i].totalQty) {
				const data: any = {
					...arr[i],
					stockAvaible: false,
					stockCurrent: this.state.docs[i].totalQty
				}
				doc.push(data)
			} else if (arr[i].totalQty < this.state.docs[i].totalQty) {
				const data: any = {
					...arr[i],
					stockAvaible: true,
					stockCurrent: this.state.docs[i].totalQty
				}
				doc.push(data)
			}
		}
		const data = doc.filter((m) => { return m.stockAvaible == false })
		if (data.length > 0) {
			Alert.alert("Stock Invalid")
			this.setState({ invalidItem: data })
		} else {
			Alert.alert(
				'Confirm Order',
				'Please verify your order',
				[
					{
						text: 'Yes',
						onPress: () =>
							this.props.order.onConfirmOrder(store, selectedOrder, userCanActive, profile, (res: any) => {
								if (res) {
									Alert.alert('Order Confirmed');
									this.props.navigation.goBack();
								}
							})
					},
					{
						text: 'Cancel',
						onPress: () => { },
						style: 'cancel'
					}
				],
				{ cancelable: false }
			);
		}
	};

	_onConfirmDelivery = (time: number) => {
		const { selectedOrder, } = this.props.order;
		const { store, userCanActive, profile, } = this.props.auth
		if (time > 0) {
			Alert.alert(
				'Confirm Delivery',
				'Please verify your order',
				[
					{
						text: 'Yes',
						onPress: () =>
							this.props.order.onConfirmDelivery(store, selectedOrder, time, userCanActive, profile, (res: any) => {
								if (res) {
									Alert.alert('Order Confirmed Delivery');
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
		} else {
			Alert.alert("Please insert valid estimate time!")
		}

	};

	_onCancelOrder = () => {
		const { selectedOrder } = this.props.order;
		const { store, userCanActive, profile, } = this.props.auth
		Alert.alert(
			'Reject Order',
			'Are you sure you want to canel this order?',
			[
				{
					text: 'Yes',
					onPress: () =>
						this.props.order.onCancelOrder(store, selectedOrder, userCanActive, profile, (res: any) => {
							if (res) {
								Alert.alert('Order has been successful rejected');
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
		const { selectedOrder, loading,
			processing,
			processingOrder,
			processingDelivery,
			processingCompleteOrder,
			processingConfirmOrder,
			processingReturnItemOrder,
		} = this.props.order;
		const { coords } = this.props.location;

		if (this.state.checking) {
			return <ActivityIndicator />
		} else {
			return (
				<OrderDetailScreen
					coords={this.props.location.toJs(coords)}
					defaultCoords={selectedOrder.order_deliveryAddress ? this.props.location.toJs(selectedOrder.order_deliveryAddress) : this.props.location.toJs(selectedOrder.user.deliveryAddress)}
					onCancelOrder={this._onCancelOrder}
					onCompleteOrder={this._onCompleteOrder}
					onConfirmDelivery={this._onConfirmDelivery}
					selectedOrder={selectedOrder}
					navigation={this.props.navigation}
					loading={processing}
					processing={processing}
					processingDelivery={processingDelivery}
					processingCompleteOrder={processingCompleteOrder}
					processingConfirmOrder={processingConfirmOrder}
					processingReturnItemOrder={processingReturnItemOrder}
					onConfirmOrder={this._onConfirmOrder}
					onReturnItemOrder={this._onReturnItemOrder}
					docs={this.state.invalidItem}
					checking={this.state.checking}
				/>
			);
		}

	}
}
