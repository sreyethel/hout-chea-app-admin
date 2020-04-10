import React from 'react';
import { observer, inject } from 'mobx-react/native';
import { Alert, Platform } from 'react-native';
import ConfirmCodeScreen from './ConfirmCode';

export interface Props {
	navigation: any;
	store: any;
	auth: any;
}
export interface State {}

@inject('store', 'auth')
@observer
export default class RegisterConfirmContainer extends React.Component<Props, State> {
	
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
			Alert.alert('Create Your Store', 'Please enter valid confirm code. You can check on your message.');
			return;
		}
		this.props.store.confirmCode(
			code,
			(success: boolean, req: any) => {
				if (success) {
					this.props.auth.canActive(this.props.navigation);
				}
			},
			this.props.navigation
		);
	};

	_onGoBack = () => {
		this.props.navigation.goBack();
	};

	_onSendCode = () => {
		const { phone } = this.props.store;
		this.props.store.createStoreResendPhoneNumber(phone);
	};

	render() {
		const { process, phone } = this.props.store;
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
