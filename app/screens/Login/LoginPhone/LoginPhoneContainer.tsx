import React from 'react';
import { inject, observer } from 'mobx-react';
import LoginPhoneScreen from './LoginPhoneScreen';

interface Props {
	navigation: any;
	auth: any;
}

@inject('auth')
@observer
export default class LoginPhoneContainer extends React.Component<Props> {
	_onSendCode = (country: string, phone: string) => {
		this.props.auth.signInWithPhoneNumber(country, phone, this.props.navigation);
	};

	render() {
		const { process } = this.props.auth;
		return (
			<LoginPhoneScreen
				process={process}
				onSendCode={this._onSendCode}
				onGoBack={() => this.props.navigation.goBack()}
			/>
		);
	}
}
