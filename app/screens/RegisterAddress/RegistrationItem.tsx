import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import modules from '../../modules';
import { fontSemiBold } from '../../../functions/customFont';

interface Props {
	onValueChange: () => void;
	text: any;
	value: any;
	icon: any;
	required?: boolean;
	disable?: boolean;
}

export default ({ onValueChange, text, icon, value, required, disable }: Props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.75}
			style={[ styles.option, disable ? { opacity: 0.5 } : null ]}
			disabled={disable}
			onPress={onValueChange}
		>
			<Feather name={icon} style={[ styles.iconTitle, { color: modules.PRIMARY_TAB } ]} />
			<Text>{text}</Text>
			{required ? (
				<Text
					numberOfLines={1}
					style={[ styles.value, value ? styles.value : required ? styles.required : null ]}
				>
					{value || 'required'}
				</Text>
			) : (
				<Text numberOfLines={1} style={[ styles.value, value ? styles.value : styles.required ]}>
					{!value ? 'optional' : value}
				</Text>
			)}
			<Feather name="chevron-right" style={styles.chevron} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	required: {
		color: modules.SUB_TITLE,
		fontWeight: '400'
	},
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: modules.BODY_HORIZONTAL,
		borderTopColor: modules.BORDER_COLOR,
		borderTopWidth: 1,
		backgroundColor: modules.WHITE,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	chevron: {
		color: modules.SUB_TITLE,
		fontSize: modules.FONT_H4,
		marginTop: 3
	},
	iconTitle: {
		fontSize: modules.FONT_H4 - 2,
		marginRight: modules.BODY_HORIZONTAL_24 - 4
	},
	value: {
		flex: 1,
		color: modules.TEXT,
		textAlign: 'right',
		...fontSemiBold,
		fontSize: modules.FONT
	},
	endOption: {
		borderBottomColor: modules.BORDER_COLOR,
		borderBottomWidth: 1
	}
});
