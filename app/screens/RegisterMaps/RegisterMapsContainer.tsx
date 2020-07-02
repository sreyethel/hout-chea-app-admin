import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import RegisterMaps from './RegisterMaps';
import Geolocation from '@react-native-community/geolocation';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react/native';

interface Props {
	navigation: any;
	auth: any;
	store: any;
}

interface State {
	coordinate: any;
	oMoving: boolean;
}

@inject('auth', 'store')
@observer
export default class RegisterMapContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			coordinate: {
				latitude: 11.5564,
				longitude: 104.9282,
				latitudeDelta: 0.03,
				longitudeDelta: 0.03
			},
			oMoving: false
		};
	}

	_onCurrentLocation = async () => {
		await Geolocation.getCurrentPosition(async (info) => {
			await this.setState({
				coordinate: {
					latitude: info.coords.latitude,
					longitude: info.coords.longitude,
					latitudeDelta: 0.03,
					longitudeDelta: 0.03
				}
			});
		});

		// await this.setState({
		// 	latitude: 11.566191,
		// 	longitude: 104.890592,
		// 	coordinate: {
		// 		latitude: 11.566191,
		// 		longitude: 104.890592
		// 	}
		// });
		// const { latitude, longitude } = this.state;
	};

	_onMoving = () => {
		this.setState({ oMoving: true });
	};

	_onMoveComplete = async (position: any) => {
		await this.setState({ coordinate: position, oMoving: false });
	};

	_onSaveMap = async () => {
		const { selectedStore } = this.props.auth;
		const { profile } = this.props.auth;
		const { coordinate } = this.state;
		const { latitude, longitude } = coordinate;
		await this.props.store.addStoreLocation(profile, selectedStore.key, latitude, longitude, (res: any) => {
			if (res) {
				Alert.alert('Successfully pinned map location');
			}
		});
	};

	render() {
		const { coordinate } = this.state;
		return (
			<RegisterMaps
				navigation={this.props.navigation}
				coordinate={coordinate}
				getCurrentLocation={this._onCurrentLocation}
				onMoving={this.state.oMoving}
				onMoveMap={this._onMoving}
				onMoveComplete={this._onMoveComplete}
				onContinue={this._onSaveMap}
			/>
		);
	}
}
