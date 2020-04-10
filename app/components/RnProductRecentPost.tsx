import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import modules from '../modules';
import Icon from 'react-native-vector-icons/Feather';
import _styles from '../_styles';
import { fontSemiBold, fontLight } from '../../functions/customFont';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface Props {
	img: string;
	name: string;
}

export default ({ img, name }: Props) => {
	return (
		<TouchableOpacity style={[ styles.card, _styles.shadow ]}>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.dateBox}>
					{/* <Text style={styles.txtSlide}>Oct</Text>
					<Text style={styles.txtSlide}>24</Text> */}
					<FastImage style={styles.img} source={{ uri: img }} />
				</View>
				<View style={styles.center}>
					<Text style={styles.txtSlide1}>{name}</Text>
					{/* <View style={_styles.rows}>
						<Text style={styles.clock}>09:00 AM</Text>
						<View style={styles.typeRow} />
						<Text style={styles.city}>Phnom Penh</Text>
					</View> */}
					{/* <Text style={[ styles.txtSub, { paddingHorizontal: 12 } ]}>Clothes</Text> */}
				</View>
			</View>
			{/* <View style={styles.bottomBox}>
				<View style={_styles.rows}>
					<Icon name="layers" size={18} color={modules.PRICECCOLOR} />
					<Text style={styles.qtyText}>12 pices</Text>
				</View>
				<View style={styles.line} />
				<View style={_styles.rows}>
					<Icon name="dollar-sign" size={18} color={modules.PRICECCOLOR} />
					<Text style={styles.priceText}>12.75</Text>
				</View>
			</View> */}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	priceText: { color: modules.SUB_TEXT, fontSize: 12, paddingHorizontal: 8 },
	line: { width: 1, height: 15, backgroundColor: modules.PRICECCOLOR },
	qtyText: { color: modules.SUB_TEXT, fontSize: 12, paddingHorizontal: 8 },
	bottomBox: { justifyContent: 'space-between', marginTop: 12, ..._styles.rows },
	txtSub: {
		fontSize: 12,
		...fontLight,
		color: modules.SUB_TEXT,
		paddingRight: 12
	},
	city: { color: modules.SUB_TEXT, fontSize: 12, paddingHorizontal: 12 },
	typeRow: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: modules.RED },
	clock: { color: modules.PRICECCOLOR, fontSize: 10, paddingHorizontal: 12 },
	dateBox: {
		borderWidth: 1,
		borderColor: modules.PRICECCOLOR,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: modules.BODY_HORIZONTAL / 2
	},
	card: {
		backgroundColor: '#ffff',
		padding: 14,
		borderRadius: 5,
		marginLeft: 12,
	
	},
	txtSlide: {
		fontSize: 12,
		...fontSemiBold,
		color: '#FFF',
		paddingHorizontal: 8
	},
	txtSlide1: {
		fontSize: 16,
		...fontSemiBold,
		color: '#2b2b2b',
		paddingHorizontal: 12
	},
	img: {
		width: modules.BODY_HORIZONTAL * 4,
		height: modules.BODY_HORIZONTAL * 4
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: modules.BODY_HORIZONTAL
	}
});
