import React from 'react';
import { useState } from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ActivityIndicator
} from 'react-native';
import modules from '../modules';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PassCode from './PassCode';
import _styles from '../_styles';
import { fontSemiBold } from '../../functions/customFont';

interface Props {
	onContinue: (code: string) => void;
	onSendCode: () => void;
	process: boolean;
	phone: string;
	error?: any;
	success?: any;
}

export default ({ onContinue, process, phone, onSendCode, error, success }: Props) => {
	const [ phoneCode, setPhoneCode ] = useState('');
	return (
		<SafeAreaView style={_styles.flx1}>
			<View style={styles.body}>
				<View style={styles.settings}>
					<Text style={styles.loginText}>Get moving with us</Text>
					<Text style={styles.connect}>Enter the 6-digit code sent to you at {phone}.</Text>
				</View>
				<View style={{paddingTop:modules.BODY_HORIZONTAL_ACTION}}>
					<PassCode onContinue={onContinue} />
				</View>
			</View>
			<View style={styles.continue}>
				<TouchableOpacity style={styles.sendCode} onPress={onSendCode}>
					<Text style={styles.agreement}>I didn't receive a code</Text>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={true}
					onPress={() => onContinue(phoneCode)}
					style={[ styles.continueButton, process ? styles.active : null ]}
				>
					{process ? (
						<ActivityIndicator color={modules.WHITE} />
					) : (
						<Icon style={styles.continueButtonIcon} name="arrow-forward" />
					)}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	sendCode: {
		justifyContent: 'center',
		flexDirection: 'column',
		flex: 1
	},
	continueButtonIcon: {
		color: modules.WHITE,
		fontSize: modules.FONT_H2
	},
	agreement: {
		color: modules.LINK,
		fontSize: modules.FONT_P
	},
	continueButton: {
		backgroundColor: modules.SUB_TITLE,
		borderRadius: modules.RADIUS_BUTTON,
		alignItems: 'center',
		justifyContent: 'center',
		padding: modules.BODY_HORIZONTAL,
		marginLeft: modules.BODY_HORIZONTAL
	},
	active: {
		backgroundColor: modules.PRIMARY
	},
	continue: {
		flexDirection: 'row',
		padding: modules.BODY_HORIZONTAL,
		alignItems: 'center'
	},
	settings: {
		marginTop: modules.BODY_HORIZONTAL
	},
	loginText: {
		...fontSemiBold,
		fontSize: modules.FONT_H4,
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
