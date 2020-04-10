import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IoIcon from 'react-native-vector-icons/Ionicons';
import modules from '../../modules';
import _styles from '../../_styles';
import { fontSemiBold, FontGSansBold, fontGSans } from '../../../functions/customFont';

interface Props {}
export default ({  }: Props) => {
	return (
		<View style={styles.headerContainer}>
			<Image style={styles.LOGO} source={modules.LOGO} />
			<View style={styles.textContainer}>
				<Text style={styles.title}>Hout Chea</Text>
				<Text style={styles.subtext}>Your trusted supplier</Text>
			</View>

			{/* <View style={_styles.rows}>
				<TouchableOpacity disabled={true} onPress={logOut} activeOpacity={0.65} style={styles.leftIcon}>
					<View style={styles.profileBorder}>
						<IoIcon name={'md-person'} style={styles.icon} />
					</View>
				</TouchableOpacity>
			</View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	subtext: {
		color: modules.WHITE,
		...fontGSans,
		fontSize: modules.FONT_S,
		marginTop: -modules.BODY_HORIZONTAL / 3
	},
	textContainer: {
		marginLeft: modules.BODY_HORIZONTAL / 2
	},
	logoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	LOGO: {
		height: 40,
		width: 40
	},
	title: {
		...FontGSansBold,
		fontSize: modules.FONT_H6,
		color: modules.WHITE,
		textTransform: 'uppercase'
	},
	profileBorder: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 25,
		width: 25,
		borderRadius: 25 / 2,
		borderColor: modules.WHITE,
		borderWidth: 2,
		overflow: 'hidden'
	},
	noti: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: modules.RED,
		width: 18,
		height: 18,
		borderRadius: 18 / 2,
		zIndex: 1,
		top: 5,
		right: 5
	},
	notiNum: {
		fontSize: modules.FONT_S,
		color: modules.WHITE,
		...fontSemiBold
	},
	icon: {
		fontSize: 24,
		color: modules.WHITE
	},
	leftIcon: {
		position: 'relative',
		padding: modules.BODY_HORIZONTAL_12
	},
	headerContainer: {
		justifyContent: 'center',
		paddingHorizontal: modules.BODY_HORIZONTAL,
		..._styles.row,
		paddingBottom: modules.BODY_HORIZONTAL,
		backgroundColor: modules.COLOR_MAIN
	}
});
