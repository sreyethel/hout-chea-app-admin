import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import MODULE from '../../modules';
import Header from '../../components/Header';
// import { } from 'react-native-gesture-handler';
import { fontSemiBold } from '../../../functions/customFont';
import _styles from '../../_styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import OrderCard from '../../components/OrderCard';
import moment from 'moment';
import { ORDER } from '../../dummy/order';
import RnOrder from '../../components/RnOrder';

interface Props {
	onOrderByStatus: (doc: any) => void;
	onOrderReject: () => void;
	onOrderDetail: (item: any) => void;
	navigation: any;
	dataOrder: any;

	loading: boolean
}

export default ({ dataOrder, loading, onOrderByStatus, onOrderDetail, onOrderReject }: Props) => {
	const [selected, setSelected] = useState(ORDER[0])
	const [category, setCategory] = useState([])
	const [Index, setIndex] = useState(0)
	return (
		<View style={[_styles.flx1, _styles.background]}>
			<View style={_styles.flx1}>

				<View style={[_styles.row, { marginHorizontal: MODULE.BODY_HORIZONTAL / 2 }]}>

					{
						ORDER.map((item, index) => {
							return (
								<RnOrder
									key={index}
									click={() =>
										_onSelected(
											item, setSelected,
											index, setIndex,
											category, setCategory,
											onOrderByStatus
										)
									}
									color={item.icon_color}
									iconName={item.icon}
									name={item.name}
									step={item.step}
									style={Index == index ? styles.btnSelected : styles.notSelected}

								/>
							)
						})
					}

				</View>
				<View style={{ backgroundColor: MODULE.WHITE, padding: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: MODULE.BORDER_COLOR }}>
					<Text style={styles.textOrder}>Recent Orders</Text>
					<View style={{ flex: 1 }} />
					<TouchableOpacity
						onPress={onOrderReject}
					>
						<Text style={{ color: MODULE.SUB_TEXT, fontSize: 12 }}>( Reject )</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={onOrderReject}
					>
						<Icon name="exclamation-circle" style={{ color: MODULE.RED, fontSize: 24, paddingLeft: 12 }} />
					</TouchableOpacity>
				</View>
				{
					dataOrder.length <= 0 ? <Text style={{ textAlign: 'center', margin: 12 }}>No Data</Text>
						: null
				}
				{
					loading ? <ActivityIndicator />
						:
						<ScrollView
							showsVerticalScrollIndicator={false}
						>
							<View style={styles.orderContainer}>
								{dataOrder.map((i: any, index: any) => {
									return (
										<OrderCard
											key={index}
											data={i}
											onDetail={() => onOrderDetail(i)}
										/>
									);
								})}
							</View>
						</ScrollView>
				}


			</View>

		</View>
	);
}

const _onSelected = (
	selected: any,
	setSelected: any,
	index: any,
	setIndex: any,
	category: any,
	setCategory: any,
	onOrderByStatus: any
) => {
	setSelected(selected);
	setIndex(index);
	setCategory(category);
	onOrderByStatus(selected)

};
const styles = StyleSheet.create({
	btnSelected: {
		// backgroundColor: MODULE.BORDER_COLOR,
		borderWidth: 1,
		borderColor: MODULE.PRIMARY
	},
	notSelected: {
		backgroundColor: MODULE.WHITE,

	},
	headerContainer: {
		backgroundColor: MODULE.COLOR_MAIN
	},
	backgroundColor: {
		backgroundColor: MODULE.COLOR_MAIN
	},
	textOrder: {
		fontSize: 16,
		...fontSemiBold,
		color: '#2b2b2b',
		// padding: MODULE.BODY_HORIZONTAL_12,
		backgroundColor: MODULE.WHITE
	},
	orderButton: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 5) / 4,
		height: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 5) / 4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: MODULE.WHITE,
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		marginVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS / 2
	},
	Icon: {
		fontSize: MODULE.FONT_H2 - 3,
		marginBottom: MODULE.BODY_HORIZONTAL / 2
	},
	textButton: {
		fontSize: MODULE.FONT_S - 1,
		color: '#555',
		...fontSemiBold
	},
	orderContainer: {
		flex: 1
	}
});
