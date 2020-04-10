import * as React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import modules from '../../modules';
import { fontLight, fontSemiBold, fontNormal } from '../../../functions/customFont';
import Icon from 'react-native-vector-icons/Feather';
import { placeholder } from '@babel/types';
interface Props {
	iconName: string;
	placeholder: string;
	label: string;
}

export default ({ iconName, placeholder, label }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.labelContainer}>
				<Text style={styles.label}>{label}</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputStyle} placeholder={placeholder} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		fontSize: modules.FONT_P,
		height: 'auto',
		paddingVertical: modules.BODY_HORIZONTAL,
		...fontNormal
	},
	container: {
		marginVertical: modules.SPACE5
	},
	label: {
		fontSize: modules.FONT_P,
		color: modules.DEFAULT
	},
	inputContainer: {
		borderBottomColor: modules.CARD_BORDER,
		borderBottomWidth: 1
	},
	labelContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
