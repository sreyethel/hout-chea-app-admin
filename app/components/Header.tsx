import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import modules from '../modules';
import { fontBold } from '../../functions/customFont';

interface Props {
	goBack?: () => void;
	title: string;
}

export default ({ goBack, title }: Props) => {
	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.container}>
				{goBack ? (
					<TouchableOpacity onPress={goBack} style={[ styles.btn ]}>
						<Icon name="chevron-left" style={styles.arrowBack} />
					</TouchableOpacity>
				) : null}
				<View style={styles.header}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<View style={styles.btn} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safe: {
		backgroundColor: modules.WHITE
	},
	arrowBack: {
		fontSize: modules.FONT_H3 - 2,
		color: modules.COLOR_MAIN
	},
	title: {
		fontSize: modules.FONT_H6,
		...fontBold,
		marginBottom: 3,
		color: modules.COLOR_MAIN
	},
	header: {
		flex: 1
	},
	btn: {
		width: 32
	},
	container: {
		flexDirection: 'row',
		paddingHorizontal: modules.BODY_HORIZONTAL,
		paddingVertical: modules.BODY_HORIZONTAL,
		alignItems: 'center',
		borderBottomColor: modules.COLOR_MAIN,
		borderBottomWidth: 1,
		backgroundColor: modules.WHITE
	}
});
