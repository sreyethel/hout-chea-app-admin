import React from 'react';
import WelcomeScreen from '../screens/Welcome';
import { inject, observer } from 'mobx-react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import SplashScreen from 'react-native-splash-screen';

interface Props extends NavigationStackScreenProps {
	auth: any;
	store: any;
	messaging: any;
	transaction: any;
	product: any;
	environment:any;
	category:any
}

@inject('auth', 'store', 'messaging', 'transaction', 'product','environment','category')
@observer
export default class WelcomeContainer extends React.Component<Props> {
	async componentDidMount() {
		await this.props.auth.canActive(this.props.navigation, async (res: any) => {
			if (res) {
				const { profile, userCanActive } = this.props.auth
				await this.props.messaging.setUserToken(profile)
				await this.props.messaging.checkPermission()
				await this.props.messaging.initialNotification()
				await this.props.transaction.fetchBadge(profile, userCanActive)
				await this.props.product.fetchData();
				await this.props.environment.fetchEnvironment()
				this.props.category.fetchCategory();
				this.props.navigation.navigate('HOME');
			}
		});
	}

	render() {
		return <WelcomeScreen />;
	}
}
