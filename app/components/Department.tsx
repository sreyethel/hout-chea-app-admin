import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MODULE from '../modules';
import FastImage from 'react-native-fast-image';
export interface AppProps {
	iconName: any;
	name: any;
	path: any;
	active?: boolean;
	click: any;
	style: any;
}

export default ({ name, path, click, style }: AppProps) => {
	return (
			<TouchableOpacity activeOpacity={1} onPress={click} style={[ styles.container,style]}>
				<Text style={styles.name}>{name}</Text>
			</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection:'row',
		marginVertical: MODULE.BODY_HORIZONTAL,
		paddingHorizontal:MODULE.BODY_HORIZONTAL * 1.5,
		paddingVertical:MODULE.BODY_HORIZONTAL,
		borderWidth:1,
		borderColor:'rgb(174,174,178)',
		marginLeft:12,
		borderRadius:8
		
	},
	icon: {
		fontSize: MODULE.FONT_H4
	},
	name: {
		color: '#333',
		fontSize: MODULE.FONT_P,
		paddingHorizontal:4,
		fontWeight:'500',
		// width: '100%',
		textAlign: 'center',
		// marginTop: MODULE.BODY_HORIZONTAL / 2
	},
	img: {
		width: MODULE.BODY_HORIZONTAL * 1.8,
		height: MODULE.BODY_HORIZONTAL * 1.8,
	}
});
