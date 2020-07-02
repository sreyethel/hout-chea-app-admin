import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import modules from '../modules';
import _styles from '../_styles';
import { fontSemiBold, fontLight } from '../../functions/customFont';
import Icon from 'react-native-vector-icons/FontAwesome5';
export interface Props {

	active?: boolean;
	click: any;
	style: any;

	color: string;
	iconName: string;
	name: string;
	step: string
}

export default ({ name, click, style, color, iconName, step }: Props) => {
	return (
		<TouchableOpacity onPress={click} style={[styles.orderButton, style]}>
			{/* <Text style={styles.textButton}>{step}</Text> */}
			<Icon style={[styles.Icon, { color: color }]} name={iconName} />
			<Text style={styles.textButton}>{name}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	orderButton: {
		width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 5) / 4,
		height: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 5) / 4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: modules.WHITE,
		marginHorizontal: modules.BODY_HORIZONTAL / 2,
		marginVertical: modules.BODY_HORIZONTAL,
		borderRadius: modules.RADIUS / 2
	},
	Icon: {
		fontSize: modules.FONT_H2 - 3,
		marginBottom: modules.BODY_HORIZONTAL / 2
	},
	textButton: {
		fontSize: modules.FONT_S - 1,
		color: '#555',
		...fontSemiBold
	},
});
