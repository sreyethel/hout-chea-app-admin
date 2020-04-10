import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, SafeAreaView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import modules from '../../modules';
import _styles from '../../_styles';
const { width } = Dimensions.get('window');
const boxHeight = width / 3.5;

export interface Props {
	onProduct: () => void;
}

export default ({ onProduct }: Props) => {
	return (
		<LinearGradient colors={modules.GRADIENT} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
			{/* <View style={_styles.rows}>
				<Ripple style={[ styles.box ]}>
					<Image source={modules.SHOP_WHITE} style={styles.icon} />
					<Text style={styles.menuText}>My Shop</Text>
				</Ripple>
				<LinearGradient
					style={{ width: 0.3, height: '100%' }}
					colors={modules.GRADIENT_LINE_2}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
				/>
				<Ripple onPress={onProduct} style={[ styles.box ]}>
					<Image source={modules.INVENTORY_WHITE} style={styles.icon} />
					<Text style={styles.menuText}>Products</Text>
				</Ripple>
				<LinearGradient
					style={{ width: 0.3, height: '100%' }}
					colors={modules.GRADIENT_LINE_2}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
				/>
				<Ripple style={[ styles.box ]}>
					<Image source={modules.REPORT_WHITE} style={styles.icon} />
					<Text style={styles.menuText}>Reports</Text>
				</Ripple>
			</View> */}
			{/* <LinearGradient
				style={{ width: '100%', height: 0.3 }}
				colors={modules.GRADIENT_LINE}
				start={{ x: 1, y: 0 }}
				end={{ x: 0, y: 0 }}
			/> */}
			<View style={_styles.rows}>
				<Ripple style={[ styles.box ]}>
					<Image source={modules.HISTORY_WHITE} style={styles.icon} />
					<Text style={styles.menuText}>Product</Text>
				</Ripple>
				<LinearGradient
					style={{ width: 0.3, height: '100%' }}
					colors={modules.GRADIENT_LINE_2}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
				/>
				<Ripple style={[ styles.box ]}>
					<Image source={modules.BOOK_WHITE} style={styles.icon} />
					<Text style={styles.menuText}>Orders</Text>
				</Ripple>
				<LinearGradient
					style={{ width: 0.3, height: '100%' }}
					colors={modules.GRADIENT_LINE_2}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
				/>
				<Ripple style={[ styles.box ]}>
					<Image source={modules.DELIVERY_WHITE} style={styles.icon} />
					<Text style={styles.menuText}>Delivery</Text>
				</Ripple>
			</View>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	icon: {
		height: 28,
		width: 28,
		opacity: 1
	},
	box: {
		width: width / 3,
		padding: modules.BODY_HORIZONTAL + 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	menuText: {
		color: '#FFF',
		paddingTop: modules.BODY_HORIZONTAL,
		fontSize: modules.FONT_P
	}
});
