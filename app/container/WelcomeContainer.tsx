import React from 'react';
import WelcomeScreen from '../screens/Welcome';
import { inject, observer } from 'mobx-react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import SplashScreen from 'react-native-splash-screen';

interface Props extends NavigationStackScreenProps {
	auth: any;
	store: any;
}

@inject('auth', 'store')
@observer
export default class WelcomeContainer extends React.Component<Props> {
	async componentDidMount() {
	
		await this.props.auth.canActive(this.props.navigation, async (res: any) => {
			if (res) {
				this.props.navigation.navigate('HOME');
			}
		});
	}

	render() {
		return <WelcomeScreen />;
	}
}
