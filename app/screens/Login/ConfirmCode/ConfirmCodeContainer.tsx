import React from 'react';
import { observer, inject } from 'mobx-react/native';
import { Alert, Platform } from 'react-native';
import ConfirmCodeScreen from './ConfirmCode';

export interface Props {
	navigation: any;
	auth: any;
	store: any;
}
export interface State {}

@inject('auth', 'store')
@observer
export default class ConfirmCodeContainer extends React.Component<Props, State> {
	componentDidMount() {
		Platform.OS == 'android'
			? this.props.store.verifyAndroid((success: boolean, req: any) => {
					if (success) {
						this.props.auth.canActive(this.props.navigation);
					}
				}, this.props.navigation)
			: null;
	}

	_onConfirmCode = (code: string) => {
		if (!code) {
			Alert.alert('Sign In', 'Please enter you phone number.');
			return;
		}
		this.props.auth.confirmCode(code, this.props.navigation);
	};

	_onGoBack = () => {
		this.props.navigation.goBack();
	};

	_onSendCode = () => {
		const { phone, country } = this.props.auth;
		this.props.auth.signInWithPhoneNumber(country, phone, this.props.navigation);
	};

	render() {
		const { process, phone } = this.props.auth;
		return (
			<ConfirmCodeScreen
				phone={phone}
				navigation={this.props.navigation}
				process={process}
				onConfirmCode={this._onConfirmCode}
				onGoBack={this._onGoBack}
				onSendCode={this._onSendCode}
			/>
		);
	}
}
