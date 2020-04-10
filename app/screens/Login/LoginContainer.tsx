import * as React from 'react';
import LoginScreen from './LoginScreen';
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { StatusBar } from 'react-native';

interface Props extends NavigationStackScreenProps{
}

export default class LoginContainer extends React.Component<Props> {

	_onLoginPhone = () => {
		this.props.navigation.navigate('LOGIN_PHONE');
	}


	render() {
		return <LoginScreen
			onLoginPhone={this._onLoginPhone}
			onCreateStore={()=>this.props.navigation.navigate("CREATE_STORE")}
		/>
	}
}
