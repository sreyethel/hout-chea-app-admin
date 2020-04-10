import * as React from 'react';
import RegisterUserScreen from './RegisterUserScreen';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react/native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

export interface AppProps extends NavigationStackScreenProps {
	auth: any;
}

@inject('auth')
@observer
export default class RegisterUserContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: '',
			email: ''
		};
	}

	_onSave = async () => {
		const { name, email } = this.state;
		await this.props.auth.createAccount(name, email);
		this.props.navigation.navigate('Home');
	};

	public render() {
		const { loading } = this.props.auth;
		return (
			<RegisterUserScreen
				onChangeName={(val) => this.setState({ name: val })}
				onChangEmail={(val) => this.setState({ email: val })}
				onSave={this._onSave}
				process={loading}
			/>
		);
	}
}
