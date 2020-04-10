import React from 'react';
import { KeyboardAvoidingView, View, SafeAreaView, Platform } from 'react-native';
import _styles from '../../../_styles';
import ArrowBackHeader from '../../../components/ArrowBackHeader';
import ConfirmCodeComponent from '../../../components/ConfirmCodeComponent';

export interface Props {
	navigation: any;
	process: boolean;
	onConfirmCode: (phoneCode: string) => void;
	onSendCode: () => void;
	onGoBack: any;
	phone: string;
}

export interface State {}

export default class ConfirmCodeScreen extends React.Component<Props, State> {
	render() {
		const { process, onGoBack, phone } = this.props;
		return (
			<View style={_styles.flx1}>
				<ArrowBackHeader arrowIcon="x-circle" title="Confirm Code" onGoBack={onGoBack} />
				<KeyboardAvoidingView
					style={_styles.containerPrimary}
					behavior={Platform.OS == 'ios' ? 'padding' : undefined}
				>
					<ConfirmCodeComponent
						phone={phone}
						process={process}
						onSendCode={this.props.onSendCode}
						onContinue={this.props.onConfirmCode}
					/>
				</KeyboardAvoidingView>
			</View>
		);
	}
}
