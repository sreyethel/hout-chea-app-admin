import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import _styles from '../../../_styles';
import ArrowBackHeader from '../../../components/ArrowBackHeader';
import PhoneInput from '../../../components/PhoneInput';
import modules from '../../../modules';

export interface Props {
	process: boolean;
	onSendCode: any;
	onGoBack: () => void;
}

export interface State {}

export default ({ process, onSendCode, onGoBack }: Props) => {
	return (
		<View style={_styles.flx1}>
			<View style={styles.container}>
				<ArrowBackHeader  color={modules.WHITE} title="Log in" onGoBack={onGoBack} />
				<KeyboardAvoidingView
					style={styles.keyboardAvoid}
					behavior={Platform.OS == 'ios' ? 'padding' : undefined}
				>
					<PhoneInput onContinue={onSendCode} process={process} />
				</KeyboardAvoidingView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { backgroundColor: modules.WHITE, flex: 1 },
	absolute: {
		position: 'absolute',
		bottom: 0,
		height: modules.BODY_HORIZONTAL * 3,
		width: modules.VIEW_PORT_WIDTH,
		backgroundColor: modules.WHITE
	},
	keyboardAvoid: {
		flex: 1,
		backgroundColor: modules.WHITE
	}
});
