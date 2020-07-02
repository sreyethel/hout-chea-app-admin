import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import modules from '../modules';
import { fontGSans, FontGSansBold } from '../../functions/customFont';
import _styles from '../_styles';

import Icon from 'react-native-vector-icons/Feather';
import { _formatDateFromDate, _formatShortDate, _formatDate } from '../services/formatdate.service';

export interface AppProps {
	index: number;
	clickMore: () => void;
	data: any
}

export default ({ data, index, clickMore }: AppProps) => {
	return (
		<TouchableOpacity onPress={clickMore} style={styles.container}>
			<View style={styles.textContainer}>
				<FastImage style={styles.product} source={{ uri: data.cover }} />
				<View style={{ width: modules.VIEW_PORT_WIDTH / 1.8, height:modules.VIEW_PORT_WIDTH/8,}}>
					<Text style={styles.name} numberOfLines={2}>{data.name}</Text>
				</View>
				<View style={{ flex: 1 }} />
				<View >
					<Text style={styles.index}> OFF° {data.discount} %</Text>
				</View>
			</View>
			<View style={{ width: modules.VIEW_PORT_WIDTH }}>
				<Text style={styles.name}>Expriry Date: {_formatDateFromDate(data.promotion_expriry_date)}</Text>
				<Text style={[styles.name, { color: modules.BLUE }]}>| {(data.promotion_expriry_date)}</Text>
			</View>
			<FastImage style={styles.image} source={{ uri: data.promotion_fileUrl }} />
			<View style={[styles.textContainer, { paddingVertical: 0, paddingTop: 12 }]}>
				<Text style={styles.title}>{data.promotion_name}</Text>
			</View>
			<View style={[styles.textContainer, { paddingVertical: 0 }]}>
				<Text style={styles.description}>{data.promotion_description}</Text>
			</View>

			<View style={[_styles.row, { width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL_24 }]}>
	<Text style={styles.subTitle}>Base Price: ${data.basePrice} | Qty: {data.totalQty} {data.unitMeasurement.code_kh}</Text>
			</View>


		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	index: {
		fontSize: modules.FONT_H6,
		...FontGSansBold,
		borderWidth: 1,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		paddingVertical: modules.BODY_HORIZONTAL / 6,
		borderRadius: modules.RADIUS / 2,
		borderColor: modules.COLOR_MAIN,
		color: modules.COLOR_MAIN
	},
	name: {
		fontSize: modules.FONT,
		...fontGSans,
		marginLeft: modules.BODY_HORIZONTAL
	},
	textContainer: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		paddingVertical: 12,
		width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2,
	},
	container: {
		width: modules.VIEW_PORT_WIDTH,
		marginTop: modules.BODY_HORIZONTAL,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: modules.WHITE,
		padding: modules.BODY_HORIZONTAL
	},
	image: {
		width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2,
		height: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2) / 2,
		borderRadius: modules.RADIUS / 3
	},
	icon: {
		fontSize: modules.FONT,
		color: modules.SUB_TEXT
	},
	product: {
		width: 45,
		height: 45,
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: modules.BLUE
	},
	title: {
		fontSize: 18,
		color: modules.PRIMARY,
		fontWeight: '500'
	},
	description: {
		color: modules.SUB_TEXT,
		fontSize: 13
	},
	subTitle: {

	}
});
