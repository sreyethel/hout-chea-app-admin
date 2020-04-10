import * as React from 'react';
import { View, StyleSheet, Text,ScrollView } from 'react-native';
import Header from '../../../components/Header';
import _styles from '../../../_styles';
// import { ScrollView } from 'react-native-gesture-handler';
import OrderCard from '../../../components/OrderCard';
import moment from 'moment';

export interface AppProps {
	title: string;
	dataOrder: any;
	onOrderDetail: (item: any) => void;
	onGoBack: () => void;
}

export interface AppState {}

export default class OrderByStatusScreen extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	public render() {
		const { title } = this.props;
		return (
			<View style={[ _styles.flx1, _styles.background ]}>
				<Header goBack={() => this.props.onGoBack()} title={title} />
				<ScrollView style={_styles.flx1}>
					{this.props.dataOrder.map((i: any, index: any) => {
						return (
							<OrderCard
								name={i.item.name}
								uri={i.item.cover}
								date={moment(i.order_date.toDate()).format('DD MMMM YYYY')}
								qty={i.qty}
								price={i.item.price}
								total={i.item.price * i.qty}
								status={i.order_status.name}
								color={i.color}
								click={() => this.props.onOrderDetail(i)}
							/>
						);
					})}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({});
