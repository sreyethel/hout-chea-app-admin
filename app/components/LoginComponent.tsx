import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import modules from '../modules';
import _styles from '../_styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { fontSemiBold, FontGSansSemiBold, fontNormal, fontLight, Moul, Battambang } from '../../functions/customFont';

interface Props {
	onSignIn: () => void;
	onSignUp: () => void;
}
export default ({ onSignIn, onSignUp }: Props) => {
	{
		return (
			<View style={_styles.flx1}>
				<View style={[ _styles.centerMode, _styles.flx1 ]}>
					<Image source={modules.LOGO} style={styles.LOGO} />
					<Text style={styles.titleLogo}>ហ៊ួត​ ជា</Text>
				</View>
				<SafeAreaView style={{ backgroundColor: modules.WHITE, overflow: 'hidden' }}>
					<View style={styles.authBox}>
						<View style={styles.titleBox}>
							<Text style={styles.title}>Login to your account</Text>
						</View>
						<TouchableOpacity onPress={onSignIn} activeOpacity={0.5} style={styles.phone}>
							<Image source={modules.FLAG} style={styles.flag} />
							<Icon name="arrow-drop-down" style={styles.arrow} />
							<Text style={styles.countryCode}>+855</Text>
							<Text style={styles.phoneText}>Your phone number</Text>
						</TouchableOpacity>
						<View style={styles.line} />
						{/* <View style={styles.signInWith}>
							<TouchableOpacity style={styles.createAccount} onPress={onSignUp}>
								<Text style={styles.withText}>Create your store</Text>
								<Feather name="chevron-right" style={styles.icon} />
							</TouchableOpacity>
						</View> */}
					</View>
				</SafeAreaView>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	titleLogo: {
		...Moul,
		fontSize: modules.FONT_BIG,
		color: '#e6cf65'
	},
	line: {
		height: 1,
		backgroundColor: modules.BORDER_COLOR,
		marginVertical: modules.BODY_HORIZONTAL
	},
	icon: {
		paddingTop: 4,
		fontSize: modules.FONT_H6,
		color: modules.PRIMARY
	},
	createAccount: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	withText: { ...fontSemiBold, fontSize: modules.FONT_P, color: modules.PRIMARY },
	fakeInput: {
		width: 1,
		height: '100%',
		backgroundColor: modules.BORDER_COLOR,
		marginHorizontal: modules.BODY_HORIZONTAL / 2
	},
	subTitle: { fontSize: modules.FONT_P, paddingTop: modules.BIG_SPACE, color: modules.SUB_TEXT },
	title: {
		...FontGSansSemiBold,
		fontSize: modules.FONT_H4,
		color: modules.COLOR_MAIN,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		paddingTop: modules.BODY_HORIZONTAL
	},
	titleBox: {
		paddingHorizontal: modules.BODY_HORIZONTAL,
		paddingVertical: modules.BODY_HORIZONTAL_24,
		justifyContent: 'center',
		alignItems: 'center'
	},
	authBox: {
		..._styles.centerMode
	},
	signInWith: {
		paddingBottom: modules.BODY_HORIZONTAL,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	LOGO: {
		height: 250,
		resizeMode: 'contain'
	},
	ICON: {
		width: 25,
		height: 25,
		resizeMode: 'contain'
	},
	socialGroup: {
		paddingHorizontal: modules.BODY_HORIZONTAL / 2
	},
	socialBox: {
		flex: 1,
		paddingHorizontal: modules.BODY_HORIZONTAL / 2
	},
	gfBox: {
		backgroundColor: modules.WHITE,
		paddingVertical: modules.BODY_HORIZONTAL_12 - 2,
		justifyContent: 'center',
		borderRadius: modules.RADIUS,
		..._styles.shadow
	},
	fText: {
		...fontSemiBold,
		paddingLeft: modules.BODY_HORIZONTAL / 2
	},
	countryCode: {
		fontSize: modules.FONT_H6,
		...fontNormal
	},
	phoneText: {
		color: modules.SUB_TEXT,
		fontSize: modules.FONT_H6,
		...fontLight,
		marginLeft: modules.BODY_HORIZONTAL / 2
	},
	phone: {
		paddingVertical: modules.BODY_HORIZONTAL,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: modules.BODY_HORIZONTAL * 2,
		borderWidth: 2,
		borderRadius: modules.RADIUS,
		borderColor: modules.COLOR_MAIN
	},
	flag: {
		width: 24,
		height: 20
	},
	arrow: {
		fontSize: modules.FONT_H4,
		color: modules.SUB_TEXT,
		paddingHorizontal: modules.BODY_HORIZONTAL / 3
	}
});
