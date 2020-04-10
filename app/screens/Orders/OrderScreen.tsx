import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MODULE from '../../modules';
import Header from '../../components/Header';
import { fontBold } from '../../../functions/customFont';
import _styles from '../../_styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OrderCard from '../../components/OrderCard';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import modules from '../../modules';

export interface AppProps {
	navigation: any;
	onOrderDetail: (item: any) => void;
	dataOrder: any;
	onOrderByStatus: (key: any) => void;
}
export interface AppState {}

export default class OrderScreen extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	public render() {
		const { dataOrder, navigation } = this.props;
		return (
			<View style={[ _styles.flx1, _styles.background ]}>
				<Header goBack={() => navigation.goBack()} title="Order" />
				<View style={_styles.flx1}>
					<View
						style={[
							_styles.row,
							{ marginHorizontal: MODULE.BODY_HORIZONTAL / 2, marginVertical: MODULE.BODY_HORIZONTAL }
						]}
					>
						<TouchableOpacity style={_styles.centerMode} onPress={() => this.props.onOrderByStatus(null)}>
							<LinearGradient
								start={{ x: 0.0, y: 0 }}
								end={{ x: 1, y: 1 }}
								colors={[ '#FFCB23', '#FF9D21' ]}
								style={styles.orderButton}
							>
								<Icon style={[ styles.Icon ]} name="collections-bookmark" />
								<Text style={styles.textButton}>Orders</Text>
							</LinearGradient>
						</TouchableOpacity>
						<TouchableOpacity style={_styles.centerMode} onPress={() => this.props.onOrderByStatus(2)}>
							<LinearGradient
								start={{ x: 0.0, y: 0 }}
								end={{ x: 1, y: 1 }}
								colors={[ '#7CD4FF', '#3CABFF' ]}
								style={styles.orderButton}
							>
								<Icon style={[ styles.Icon ]} name="playlist-add" />
								<Text style={styles.textButton}>Confirme</Text>
							</LinearGradient>
						</TouchableOpacity>
						<TouchableOpacity style={_styles.centerMode} onPress={() => this.props.onOrderByStatus(3)}>
							<LinearGradient
								start={{ x: 0.0, y: 0 }}
								end={{ x: 1, y: 1 }}
								colors={[ '#86F972', '#34D932' ]}
								style={styles.orderButton}
							>
								<Icon style={[ styles.Icon ]} name="check-box" />
								<Text style={styles.textButton}>Complete</Text>
							</LinearGradient>
						</TouchableOpacity>
						<TouchableOpacity style={_styles.centerMode} onPress={() => this.props.onOrderByStatus(5)}>
							<LinearGradient
								start={{ x: 0.0, y: 0 }}
								end={{ x: 1, y: 1 }}
								colors={[ MODULE.PROGRESS_COLOR[3], MODULE.PROGRESS_COLOR_2[3] ]}
								style={styles.orderButton}
							>
								<Icon style={[ styles.Icon ]} name="cancel" />
								<Text style={styles.textButton}>Cancel</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
					<Text style={styles.textOrder}>Recent Orders</Text>
					<ScrollView>
						<View style={styles.orderContainer}>
							{dataOrder.map((i: any, index: any) => {
								return (
									<OrderCard
										key={index}
										name={i.item.name}
										uri={i.item.cover}
										date={moment(i.order_date.toDate()).format('DD MMMM YYYY')}
										qty={i.qty}
										price={i.item.price}
										total={i.item.price * i.qty}
										status={i.order_status.name}
										click={() => this.props.onOrderDetail(i)}
									/>
								);
							})}
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: MODULE.COLOR_MAIN
	},
	backgroundColor: {
		backgroundColor: MODULE.COLOR_MAIN
	},
	textOrder: {
		fontSize: 16,

		color: '#2b2b2b',
		padding: MODULE.BODY_HORIZONTAL_12,
		backgroundColor: MODULE.WHITE
	},
	orderButton: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 5) / 4,
		height: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 5) / 4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: MODULE.WHITE,
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		borderRadius: MODULE.RADIUS / 2
	},
	Icon: {
		fontSize: MODULE.FONT_H2,

		color: modules.WHITE
	},
	textButton: {
		fontSize: MODULE.FONT_S,
		color: modules.WHITE,
		...fontBold,
		marginTop: modules.BODY_HORIZONTAL / 2
	},
	orderContainer: {
		flex: 1
	}
});
