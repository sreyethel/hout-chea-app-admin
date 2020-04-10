import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import MODULE from './../modules';
import Icon from 'react-native-vector-icons/Feather';
import _styles from '../_styles';
import modules from './../modules';

export interface AppProps {
	title: string;
	fileUrl: string;
	price: any;
	shipping: any;
	qty?: number;
	bgColor: Array<any>;
	desc: string;
	ClickTrash?: any;
	click?: any;
	clickMore?: any;
}

export default ({ title, fileUrl, price, shipping, desc, clickMore }: AppProps) => {
	return (
		<View style={styles.container}>
			<View style={_styles.center}>
				{fileUrl ? (
					<View style={styles.imgContainer}>
						<FastImage style={styles.img} source={{ uri: fileUrl }} />
					</View>
				) : (
					<View style={styles.imgContainer}>
						<Image style={styles.img} source={require('./../../assets/product-placeholder.jpg')} />
					</View>
				)}
			</View>
			<View style={styles.textContainer}>
				<View>
					<View style={styles.titleContainer}>
						<Text style={styles.title} numberOfLines={2}>
							{title}
						</Text>
						<TouchableOpacity onPress={clickMore}>
							<Icon style={styles.iconClose} name="more-horizontal" />
						</TouchableOpacity>
					</View>
					<Text style={styles.shipping}>CODE :{shipping}</Text>
				</View>

				<View style={styles.priceContainer}>
					<View style={styles.qtyPicker}>
						<View>
							<Text numberOfLines={2} style={styles.textUnit}>
								{desc}
							</Text>
						</View>
					</View>
					<View>
						<Text style={styles.price}>${price}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: MODULE.BODY_HORIZONTAL,
		flexDirection: 'row',
		backgroundColor: MODULE.WHITE,

		padding: MODULE.BODY_HORIZONTAL
	},
	img: {
		width: '100%',
		height: '100%'
	},
	imgContainer: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 4) / 4,
		height: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 4) / 4,
		borderRadius: MODULE.RADIUS,
		overflow: 'hidden'
	},
	text: {
		textAlign: 'center',
		marginTop: MODULE.BODY_HORIZONTAL / 2,
		fontSize: MODULE.FONT_S,
		fontWeight: '500',
		fontStyle: 'italic',
		color: '#2b2b2b'
	},
	textContainer: {
		flex: 1,
		justifyContent: 'space-between',
		marginLeft: MODULE.BODY_HORIZONTAL
	},
	title: {
		fontSize: MODULE.FONT_P,

		color: '#333',
		fontWeight: '400',
		paddingBottom: MODULE.SPACE,
		width: '80%'
	},
	price: {
		fontWeight: '700',

		color: 'rgba(0,0,0,0.8)',
		fontSize: MODULE.FONT,
		paddingHorizontal: MODULE.BODY_HORIZONTAL,
		paddingVertical: MODULE.BODY_HORIZONTAL / 2,
		backgroundColor: MODULE.BORDER_COLOR,
		borderRadius: MODULE.RADIUS
	},
	shipping: {
		fontSize: MODULE.FONT_S,
		marginTop: MODULE.BODY_HORIZONTAL / 4,
		color: MODULE.COLOR_MAIN
	},
	priceContainer: {
		borderRadius: MODULE.CARD_RADIUS,
		borderColor: '#e0e0e0',
		flexDirection: 'row',
		paddingTop: MODULE.BODY_HORIZONTAL,
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1
	},
	stepper: {},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	IOS: {
		borderWidth: 0,
		paddingLeft: MODULE.BODY_HORIZONTAL,
		paddingVertical: MODULE.BODY_HORIZONTAL / 9,
		fontWeight: '400',
		color: 'rgba(0,0,0,0.9)',
		paddingRight: MODULE.BODY_HORIZONTAL * 1.5,
		overflow: 'hidden',
		fontSize: MODULE.FONT_P,
		borderRadius: MODULE.CARD_RADIUS,
		borderColor: 'rgba(0,0,0,0.1)',
		marginRight: MODULE.BODY_HORIZONTAL / 2,
		backgroundColor: MODULE.BORDER_COLOR
	},
	textPieces: {
		fontSize: MODULE.FONT_S,
		color: '#888',
		marginLeft: MODULE.BODY_HORIZONTAL / 2
	},
	qtyPicker: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: MODULE.CARD_RADIUS,
		borderColor: MODULE.COLOR_MAIN,
		flex: 1
	},
	iconDown: {
		fontSize: MODULE.FONT_S,
		position: 'absolute',
		right: 10,
		top: 4,
		color: '#999'
	},
	iconClose: {
		fontSize: 22,
		color: 'rgba(0,0,0,0.2)',
		paddingHorizontal: MODULE.SPACE
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between'
	},
	iconQty: {
		fontSize: MODULE.FONT_H5,
		color: 'rgba(0,0,0,0.7)'
	},
	textUnit: {
		fontSize: MODULE.FONT_S,
		color: 'rgba(0,0,0,0.5)',
		paddingRight: modules.BODY_HORIZONTAL
	},
	colorView: {
		width: MODULE.BODY_HORIZONTAL,
		height: MODULE.BODY_HORIZONTAL
	}
});
