import * as React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import _styles from '../_styles';
import modules from '../modules';
import { fontSemiBold, fontBold, fontLight } from '../../functions/customFont';
import { SimpleAddProductProps } from '../dummy/sampleData';
import { nFormatter } from '../services/mapping.service';

interface Props {
	item: SimpleAddProductProps;
}

export default ({ item }: Props) => {
	const { img, category, title, subTitle, status, price, discount } = item;
	return (
		<View style={[ _styles.rows, { borderBottomColor: modules.BORDER_COLOR, borderBottomWidth: 0.5 } ]}>
			<View style={styles.imgBox}>
				<Image source={img} style={styles.Pimg} />
			</View>
			<View style={[ _styles.flx1, styles.containerBox ]}>
				<Text style={styles.category}>{category}</Text>
				<Text numberOfLines={3} style={styles.title}>
					{title}
				</Text>
				{subTitle ? (
					<Text numberOfLines={4} style={styles.subTitle}>
						{subTitle}
					</Text>
				) : null}
				{discount || discount != 0 ? <Text style={styles.rate}>{discount}% off</Text> : null}
				<View style={[ _styles.rows, { justifyContent: 'space-between' } ]}>
					<Text style={styles.status}>{status}</Text>
					<View style={styles.priceBox}>
						{discount || discount != 0 ? (
							<View style={styles.boxDis}>
								<View style={styles.disLine} />
								<Text style={styles.disPrice}>${price}</Text>
							</View>
						) : null}
						<Text style={styles.price}>${price}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	priceBox: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	disLine: {
		height: 1,
		width: '100%',
		backgroundColor: modules.TEXT,
		position: 'absolute',
		top: '35%',
		left: 0
	},
	boxDis: {
		position: 'relative',
		paddingRight: modules.BODY_HORIZONTAL / 2
	},
	disPrice: {
		fontSize: modules.FONT_S,
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	rate: {
		fontSize: modules.FONT_S,
		color: modules.RED,
		textAlign: 'right'
	},
	subTitle: {
		fontSize: modules.FONT_S,
		color: modules.TEXTSUB,
		paddingBottom: modules.BODY_HORIZONTAL
	},
	containerBox: {
		paddingVertical: modules.BODY_HORIZONTAL,
		paddingRight: modules.BODY_HORIZONTAL
	},
	container: {
		justifyContent: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: modules.BORDER_COLOR
	},
	imgBox: {
		padding: modules.BODY_HORIZONTAL
	},
	Pimg: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
		borderRadius: modules.RADIUS
	},
	category: {
		fontSize: modules.FONT_S,
		...fontSemiBold,
		color: modules.SUB_TEXT
	},
	title: {
		fontSize: modules.FONT_P,
		...fontSemiBold,
		paddingBottom: modules.BODY_HORIZONTAL
	},
	price: {
		color: modules.BG_2,
		...fontBold,
		fontSize: modules.FONT_H6
	},
	status: {
		fontSize: modules.FONT_P,
		textAlign: 'right',
		...fontSemiBold,
		color: modules.RED,
		textTransform: 'capitalize'
	}
});
