import React from 'react';
import HomeScreen from './HomeScreen';
import { inject } from 'mobx-react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { observer } from 'mobx-react/native';

interface Props extends NavigationStackScreenProps {
	auth: any;
	store: any;
	order: any;
	version: any;
}

@inject('auth', 'store', 'order', 'version')
@observer
export default class HomeContainer extends React.Component<Props> {
	
	async componentDidMount() {
		this.props.auth.canActive(this.props.navigation, (res: any) => {
			if (res) {
				this.props.order.fetchOrder(res, 1);
			}
		});
	}

	openProduct = () => {
		this.props.navigation.navigate('AddProduct');
	};

	_logOut = () => {
		this.props.auth.logOut();
	};

	_goTo = (item: any) => {
		this.props.navigation.navigate(item);
	};

	render() {
		const { process } = this.props.store;
		const { profile } = this.props.auth;
		const { dataAllOrder, dataStatistic, dataLastSevenDays, loading } = this.props.order;
		return (
			<HomeScreen
				goTo={this._goTo}
				onProduct={() => this.props.navigation.navigate('PRODUCT')}
				loading={process}
				account={profile}
				order={dataAllOrder}
				dataStatistic={dataStatistic}
				dataLastSevenDays={dataLastSevenDays}
				loadingBarChart={loading}
			/>
		);
	}
}
