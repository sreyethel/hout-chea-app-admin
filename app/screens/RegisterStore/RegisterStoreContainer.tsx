import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { observer, inject } from 'mobx-react/native';
import StoreScreen from './RegisterStore';
import { Alert } from 'react-native';

interface Props extends NavigationStackScreenProps{
	store: any;
	auth: any;
}

interface State {
	phone: any;
	disabled: boolean;
}

@inject('store', 'auth')
@observer
export default class RegisterStoreContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			phone: '',
			disabled: true
		};
	}

	_createAccount = () => {
		const { phone } = this.state;
		if (!phone) {
			Alert.alert('Create Your Store', 'Phone number is required. Please try again!');
			return;
		}
		this.props.store.createStoreWithPhoneNumber(phone, this.props.navigation);
	};

	_goBack = () => {
		this.props.navigation.goBack();
	};

	render() {
		const { process, country } = this.props.store;
		const { phone, disabled } = this.state;
		return (
			<StoreScreen
				onContinue={this._createAccount}
				onCountry={() => this.props.navigation.navigate('COUNTRIES')}
				onGoBack={this._goBack}
				process={process}
				phone={phone}
				disabled={disabled}
				onChangePhone={(value: any) => this.setState({ disabled: value ? false : true, phone: value })}
				country={country}
			/>
		);
	}
}
