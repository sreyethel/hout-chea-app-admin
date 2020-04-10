import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import modules from '../modules';
import { fontGSans, FontGSansBold } from '../../functions/customFont';
import _styles from '../_styles';

import Icon from 'react-native-vector-icons/FontAwesome5';

export interface AppProps {
	image: string;
	index: number;
	name: string;
	clickMore: () => void;
}

export default ({ image, index, name, clickMore }: AppProps) => {
	return (
		<View style={styles.container}>
			<FastImage style={styles.image} source={{ uri: image }} />
			<View style={styles.textContainer}>
				<View style={_styles.row}>
					<Text style={styles.index}> N° {index}</Text>
					<Text style={styles.name}>{name}</Text>
				</View>

				<TouchableOpacity onPress={clickMore}>
					<Icon style={styles.icon} name="ellipsis-h" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	index: {
		fontSize: modules.FONT_H6,
		...FontGSansBold,
		borderWidth: 1,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		paddingVertical: modules.BODY_HORIZONTAL / 6,
		borderRadius: modules.RADIUS / 2,
		borderColor: modules.COLOR_MAIN,
		color: modules.COLOR_MAIN
	},
	name: {
		fontSize: modules.FONT,
		...fontGSans,
		marginLeft: modules.BODY_HORIZONTAL
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2,
		marginTop: modules.BODY_HORIZONTAL
	},
	container: {
		width: modules.VIEW_PORT_WIDTH,
		marginTop: modules.BODY_HORIZONTAL,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: modules.WHITE,
		padding: modules.BODY_HORIZONTAL
	},
	image: {
		width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2,
		height: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2) / 2,
		borderRadius: modules.RADIUS / 2
	},
	icon: {
		fontSize: modules.FONT,
		color: modules.SUB_TEXT
	}
});
