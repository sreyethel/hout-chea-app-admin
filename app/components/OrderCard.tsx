import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import MODULE from './../modules';
import _styles from '../_styles';
import { fontBold, fontSemiBold } from '../../functions/customFont';

export interface AppProps {
	uri: string;
	name: string;
	qty: number;
	price: number;
	date: any;
	total: number;
	status: string;
	click: () => void;
}

export default ({ uri, name, qty, date, price, total, status, click }: AppProps) => {
	return (
		<TouchableOpacity onPress={click} style={styles.container}>
			<View style={_styles.separate}>
				<Text style={styles.date}>{date}</Text>
				<View style={styles.statusButton}>
					<View
						style={[
							styles.statusColor,
							status == 'pending' ? { backgroundColor: MODULE.PROGRESS_COLOR[1] } : null,
							status == 'confirm' ? { backgroundColor: MODULE.PROGRESS_COLOR[4] } : null,
							status == 'complete' ? { backgroundColor: MODULE.PROGRESS_COLOR[0] } : null,
							status == 'cancel' ? { backgroundColor: MODULE.PROGRESS_COLOR[3] } : null
						]}
					/>
					<Text style={styles.statusText}>{status}</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.imgContainer}>
					<FastImage style={styles.img} source={{ uri: uri }} />
				</View>
				<View style={_styles.flx1}>
					<Text numberOfLines={2} style={styles.title}>
						{name}
					</Text>
					<Text style={styles.price}>${price}</Text>
					<View style={styles.qtyContainer}>
						<View style={_styles.separate}>
							<Text style={styles.label}>Qty:</Text>
							<Text style={styles.text}>{qty}</Text>
						</View>
						<View style={_styles.separate}>
							<Text style={styles.label}>Total</Text>
							<Text style={styles.text}>${total}</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	qtyContainer: {
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		marginTop: MODULE.BODY_HORIZONTAL
	},
	container: {
		backgroundColor: MODULE.WHITE,
		marginTop: MODULE.BODY_HORIZONTAL,
		padding: MODULE.BODY_HORIZONTAL
	},
	img: {
		width: '100%',
		height: '100%'
	},
	imgContainer: {
		width: MODULE.BODY_HORIZONTAL * 9,
		height: MODULE.BODY_HORIZONTAL * 9,
		borderWidth: 1,
		borderRadius: MODULE.RADIUS,
		overflow: 'hidden',
		borderColor: MODULE.BORDER_COLOR
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	title: {
		marginLeft: MODULE.BODY_HORIZONTAL
	},
	price: {
		marginLeft: MODULE.BODY_HORIZONTAL,
		...fontBold,
		fontSize: MODULE.FONT,
		marginTop: MODULE.BODY_HORIZONTAL / 2
	},
	text: {
		fontSize: MODULE.FONT,
		...fontSemiBold
	},
	date: {
		color: '#555',
		marginBottom: MODULE.BODY_HORIZONTAL,
		fontSize: MODULE.FONT_S
	},
	labelShipping: {
		color: MODULE.COLOR_MAIN,
		marginRight: MODULE.BODY_HORIZONTAL
	},
	shippingContainer: {
		marginBottom: MODULE.BODY_HORIZONTAL,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 2,
		paddingBottom: MODULE.BODY_HORIZONTAL,
		borderBottomColor: MODULE.BORDER_COLOR
	},
	statusButton: {
		borderRadius: MODULE.RADIUS,
		flexDirection: 'row',
		alignItems: 'center'
	},
	statusColor: {
		width: MODULE.BODY_HORIZONTAL,
		height: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.BODY_HORIZONTAL / 2,
		marginRight: MODULE.BODY_HORIZONTAL / 2
	},
	statusText: {},
	label: {
		color: '#555'
	},
	option: {
		marginLeft: MODULE.BODY_HORIZONTAL,
		marginTop: MODULE.BODY_HORIZONTAL / 2,
		flexDirection: 'row',
		alignItems: 'center'
	},
	size: {
		paddingHorizontal: MODULE.BODY_HORIZONTAL,
		borderWidth: 2,
		borderRadius: MODULE.RADIUS / 2,
		borderColor: MODULE.BORDER_COLOR
	},
	labelOption: {
		marginRight: MODULE.BODY_HORIZONTAL / 2
	}
});
