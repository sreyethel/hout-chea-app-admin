import React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, View, Text, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import modules from '../modules';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fontSemiBold, fontNormal, fontLight } from './../../functions/customFont';
import _styles from '../_styles';
import Ripple from 'react-native-material-ripple';
interface Props {
	onContinue: (country: string, phoneNumber: string) => void;
	process: boolean;
}

export default ({ onContinue, process }: Props) => {
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ country, setCountry ] = useState('+855');
	return (
		<SafeAreaView style={_styles.flx1}>
			<View style={styles.body}>
				<View style={styles.settings}>
					<Text style={styles.connect}>Welcome to Hout Chea please enter your phone number to continue.</Text>
				</View>
				<View style={styles.phone}>
					<Ripple style={styles.country}>
						<Image source={modules.FLAG} style={styles.flag} />
						<Icon name="arrow-drop-down" style={styles.arrow} />
						<Text style={styles.countryCode}>+855</Text>
					</Ripple>
					<TextInput
						autoFocus={true}
						keyboardType="phone-pad"
						keyboardAppearance="dark"
						editable={!process}
						value={phoneNumber}
						onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
						style={styles.phoneText}
						placeholder="010 234 567"
					/>
				</View>
			</View>
			<View style={styles.continue}>
				<Text style={styles.agreement}>
					By continuing by you may receive an SMS for verification. Message and data rates may apply.
				</Text>
				<Ripple
					disabled={process}
					onPress={() => onContinue(country, phoneNumber)}
					style={styles.continueButton}
				>
					{process ? (
						<ActivityIndicator color={modules.WHITE} />
					) : (
						<Icon style={styles.continueButtonIcon} name="arrow-forward" />
					)}
				</Ripple>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	continueButtonIcon: {
		color: modules.WHITE,
		fontSize: modules.FONT_H2
	},
	agreement: {
		color: modules.TEXT,
		fontSize: modules.FONT_P,
		flex: 1
	},
	continueButton: {
		overflow: 'hidden',
		backgroundColor: modules.COLOR_MAIN,
		borderRadius: modules.RADIUS_BUTTON,
		alignItems: 'center',
		justifyContent: 'center',
		padding: modules.BODY_HORIZONTAL,
		marginLeft: modules.BODY_HORIZONTAL
	},
	continue: {
		flexDirection: 'row',
		padding: modules.BODY_HORIZONTAL,
		alignItems: 'center'
	},
	country: {
		flexDirection: 'row',
		paddingHorizontal: modules.BODY_HORIZONTAL / 2,
		paddingVertical: modules.BODY_HORIZONTAL / 2,
		borderRadius: modules.RADIUS / 2,
		borderColor: modules.BORDER_COLOR,
		borderWidth: 1,
		...fontSemiBold,
		marginRight: modules.BODY_HORIZONTAL / 2,
		alignItems: 'center'
	},
	settings: {
		marginTop: modules.BODY_HORIZONTAL
	},
	countryCode: {
		fontSize: modules.FONT_H4,
		paddingHorizontal: modules.BODY_HORIZONTAL / 3,
		...fontNormal
	},
	phoneText: {
		color: modules.TEXT,
		fontSize: modules.FONT_H4,
		borderColor: modules.BORDER_COLOR,
		borderWidth: 1,
		flex: 1,
		paddingHorizontal: modules.BODY_HORIZONTAL / 2,
		paddingVertical: modules.BODY_HORIZONTAL / 2,
		borderRadius: modules.RADIUS / 2,
		...fontLight
	},
	flag: {
		width: 24,
		height: 20
	},
	arrow: {
		fontSize: modules.FONT_H4,
		color: modules.SUB_TEXT,
		paddingLeft: modules.BODY_HORIZONTAL / 3
	},
	phone: {
		paddingVertical: modules.BODY_HORIZONTAL_24,
		flexDirection: 'row',
		alignItems: 'center'
	},
	loginText: {
		...fontSemiBold,
		fontSize: modules.FONT,
		marginBottom: modules.BODY_HORIZONTAL / 3
	},
	connect: {
		color: modules.SUB_TEXT,
		fontSize: modules.FONT_P
	},
	body: {
		paddingHorizontal: modules.BODY_HORIZONTAL,
		flex: 1
	}
});
