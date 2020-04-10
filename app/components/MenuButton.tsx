import * as React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import modules from './../modules';
import _styles from '../_styles';
import { fontGSans } from '../../functions/customFont';
export interface AppProps {
	title: string;
	image: any;
	click: any;
}

export default ({ title, image, click }: AppProps) => {
	return (
		<Ripple onPress={click} style={styles.container}>
			<Image style={styles.image} source={image} />
			<Text style={styles.title}>{title}</Text>
		</Ripple>
	);
};

const styles = StyleSheet.create({
	image: {
		width: modules.BODY_HORIZONTAL * 3,
		height: modules.BODY_HORIZONTAL * 3
	},
	container: {
		width: (modules.VIEW_PORT_WIDTH) / 3,
		height: modules.VIEW_PORT_WIDTH / 4,

		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: modules.FONT_P - 1,
		...fontGSans,
		color: modules.SUB_TEXT,
		marginTop: modules.BODY_HORIZONTAL / 2
	}
});
