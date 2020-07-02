import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import modules from '../modules';
import _styles from '../_styles';
import { fontSemiBold, fontLight } from '../../functions/customFont';
import FastImage from 'react-native-fast-image';

export interface Props {
	iconName: any;
	name: any;
	path: any;
	active?: boolean;
	click: any;
	style: any;
}

export default ({ name, click, style }: Props) => {
	return (
		<TouchableOpacity style={[styles.card, style]} onPress={click}>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.center}>
					<Text style={[styles.txtSlide1,style]}>{name}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({

	dateBox: {
		borderWidth: 0,
		borderColor: modules.PRICECCOLOR,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',

	},
	card: {
		backgroundColor: '#ffff',
		padding: modules.BODY_HORIZONTAL / 2,
		height: modules.VIEW_PORT_WIDTH / 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		marginLeft: 12,
		borderWidth: 1,
		borderColor: modules.COLOR_MAIN
	},

	txtSlide1: {
		fontSize: modules.FONT_P,

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

	}
});
