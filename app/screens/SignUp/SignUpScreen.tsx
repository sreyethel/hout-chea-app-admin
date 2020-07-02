import React from 'react';
import { View, TextInput, KeyboardAvoidingView, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import _styles from '../../_styles';
import ArrowBackHeader from '../../components/ArrowBackHeader';
import modules from '../../modules';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/Feather';
import { FontGSansBold, fontSemiBold } from '../../../functions/customFont';

interface Props {
	goBack: () => void;
	onContinue: () => void;
	onChangeName: (text: any) => void;
	process: boolean;
	name: string;
	disabled: boolean;
}

export default ({ goBack, process, onContinue, name, onChangeName, disabled }: Props) => {
	return (
		<View style={_styles.containerPrimary}>
			{/* <ArrowBackHeader
				arrowIcon="x-circle"
				borderBottomWidth={1}
				onRight={onContinue}
				rightText="Continue"
				disabled={disabled}
				process={process}
				color={modules.WHITE}
				isWhite={true}
				title="Create Your Store"
				onGoBack={goBack}
			/> */}
			 	<ArrowBackHeader  color={modules.WHITE} title="Create Your Store" onGoBack={goBack} />
			<KeyboardAvoidingView style={_styles.containerPrimary} behavior="padding">
				<View style={styles.header}>
					<Text style={styles.title}>Build your business</Text>
					<Text style={styles.subtitle}>You’ve got the will. We’ve got the way.</Text>
				</View>
				<TextInput
					editable={!process}
					placeholder="Your store name"
					value={name}
					onChangeText={(text) => onChangeName(text)}
					style={styles.input}
				/>
				<View style={_styles.flx1} />
				<View style={styles.continue}>
					<Text style={styles.agreement}>
						By continuing by you may receive an SMS for verification. Message and data rates may apply.
					</Text>
					<Ripple
						disabled={disabled || process}
						onPress={onContinue}
						style={[ styles.continueButton, disabled ? { backgroundColor: modules.DISABLED } : null ]}
					>
						{process ? (
							<ActivityIndicator color={modules.WHITE} />
						) : (
							<Icon style={styles.continueButtonIcon} name="arrow-right" />
						)}
					</Ripple>
					<SafeAreaView />
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		marginHorizontal: modules.BODY_HORIZONTAL * 2,
		paddingVertical: modules.BODY_HORIZONTAL_18,
		paddingHorizontal: modules.BODY_HORIZONTAL_18,
		borderColor: modules.BORDER_COLOR,
		borderWidth: 1,
		backgroundColor: modules.WHITE,
		borderRadius: modules.RADIUS,
		fontSize: modules.FONT_H6
	},
	subtitle: {
		color: modules.SUB_TEXT
	},
	title: {
		...FontGSansBold,
		fontSize: modules.FONT_H3,
		paddingBottom: modules.BODY_HORIZONTAL / 2,
		marginTop: modules.BODY_HORIZONTAL
	},
	header: {
		alignItems: 'center',
		paddingVertical: modules.BODY_HORIZONTAL_24,
		marginBottom: modules.BODY_HORIZONTAL
	},
	continue: {
		flexDirection: 'row',
		paddingVertical: modules.BODY_HORIZONTAL_24 * 2,
		paddingHorizontal: modules.BODY_HORIZONTAL_24,
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
	continueButtonIcon: {
		color: modules.WHITE,
		fontSize: modules.FONT_H2
	},
	agreement: {
		color: modules.SUB_TEXT,
		fontSize: modules.FONT_P,
		flex: 1
	},
	continueButton: {
		overflow: 'hidden',
		backgroundColor: modules.PRIMARY,
		borderRadius: modules.RADIUS_BUTTON,
		alignItems: 'center',
		justifyContent: 'center',
		padding: modules.BODY_HORIZONTAL,
		marginLeft: modules.BODY_HORIZONTAL,
		width: 64,
		height: 64
	}
});
