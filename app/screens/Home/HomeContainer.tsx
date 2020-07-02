import React from 'react';
import HomeScreen from './HomeScreen';
import { inject } from 'mobx-react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { observer } from 'mobx-react/native';
import { Linking, View, Modal, Alert, Platform } from 'react-native';
import Update from '../../components/Update';

interface Props extends NavigationStackScreenProps {
	auth: any;
	store: any;
	order: any;
	version: any;
	transaction: any;
	environment: any;

}
export interface State {
	modal: boolean
}
@inject('auth', 'store', 'order', 'version', 'transaction', 'environment')
@observer
export default class HomeContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			modal: false
		};
	}
	async componentDidMount() {
	
		const { isUpdatediOS, isUpdatedAndroid } = this.props.environment
		const update = Platform.OS == "ios" ? isUpdatediOS : isUpdatedAndroid
		console.log('update', update)
		this.setState({ modal: update })
		const { userCanActive, profile, store } = this.props.auth
		if (userCanActive) {
			await this.props.order.fetchOrder(store, 1);
		} else {
			await this.props.order.fetchStoreOrder(profile, 1)
		}

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
	_openMessenger = () => {
		const sharingUrl = 'www.google.com';
		Linking.canOpenURL('https://www.messenger.com/t/phou.sophorn.7?link=hell0').then(supported => {
			if (supported) {
				Linking.openURL('https://www.messenger.com/t/houtcheaofficial');
			} else {
			}
		}).catch(err => console.error('An error occurred', err));

	}
	_onUpdate = () => {
		const { dataEnvironment } = this.props.environment
		if (Platform.OS == 'ios') {
			Linking.openURL(dataEnvironment.app_store_admin)
			this.setState({ modal: !this.state.modal })
		} else {
			Linking.openURL(dataEnvironment.play_store ? dataEnvironment.play_store_admin : 'google.com')
			this.setState({ modal: !this.state.modal })
		}
	}

	render() {
		const { process } = this.props.store;
		const { profile } = this.props.auth;
		const { dataAllOrder, dataStatistic, dataLastSevenDays, loading } = this.props.order;
		const { badge } = this.props.transaction
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<HomeScreen
					goTo={this._goTo}
					onProduct={() => this.props.navigation.navigate('PRODUCT')}
					loading={process}
					account={profile}
					order={dataAllOrder}
					dataStatistic={dataStatistic}
					dataLastSevenDays={dataLastSevenDays}
					loadingBarChart={loading}
					openMessenger={this._openMessenger}
					badge={badge ? badge : 0}
				/>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modal}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
					}}
				>
					<Update
						onCancel={() => { this.setState({ modal: !this.state.modal }) }}
						onUpdate={this._onUpdate}
					/>

				</Modal>
			</View>
		);
	}
}
